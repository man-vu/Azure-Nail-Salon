import express from 'express';
import { body, validationResult } from 'express-validator';
import { register, login } from '../services/authService.js';
import { authMiddleware } from '../middleware/auth.js';
import { findById } from '../models/userModel.js';

const router = express.Router();

router.post(
  '/register',
  body('username').isLength({ min: 3 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await register(req.body);
      res.json(user);
    } catch {
      res.status(400).json({ error: 'User already exists' });
    }
  }
);

router.post(
  '/login',
  body('identifier').notEmpty(),
  body('password').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { identifier, password } = req.body;
    const result = await login(identifier, password);
    if (!result) return res.status(401).json({ error: 'Invalid credentials' });
    res.json(result);
  }
);

router.get('/me', authMiddleware, async (req, res) => {
  const user = await findById(req.userId);
  if (!user) return res.sendStatus(404);
  const { id, username, email, firstName, lastName, phone, language } = user;
  res.json({ id, username, email, firstName, lastName, phone, language });
});

export default router;
