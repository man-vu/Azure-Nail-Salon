import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret';

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.sendStatus(401);
  try {
    const token = header.split(' ')[1];
    const payload = jwt.verify(token, SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    res.sendStatus(401);
  }
}
