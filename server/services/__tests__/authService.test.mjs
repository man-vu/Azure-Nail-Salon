import { jest } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const userModelPath = resolve(__dirname, '../..', 'models', 'userModel.js');

jest.unstable_mockModule(userModelPath, () => ({
  findByUsername: jest.fn(),
  findByEmail: jest.fn(),
  createUser: jest.fn(),
  findByIdentifier: jest.fn()
}));

const bcrypt = await import('bcryptjs');
const jwt = await import('jsonwebtoken');
const userModel = await import(userModelPath);
const { register, login } = await import('../authService.js');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('register', () => {
  test('creates a user when available', async () => {
    userModel.findByUsername.mockResolvedValue(null);
    userModel.findByEmail.mockResolvedValue(null);
    userModel.createUser.mockResolvedValue({ id: 1, username: 'u', email: 'e' });

    const result = await register({ username: 'u', email: 'e', password: 'p' });

    expect(bcrypt.hash).toHaveBeenCalledWith('p', 10);
    expect(userModel.createUser).toHaveBeenCalled();
    expect(result).toEqual({ id: 1, username: 'u', email: 'e' });
  });

  test('throws when user exists', async () => {
    userModel.findByUsername.mockResolvedValue({ id: 1 });

    await expect(register({ username: 'u', email: 'e', password: 'p' }))
      .rejects.toThrow('User already exists');
  });
});

describe('login', () => {
  test('returns token with valid credentials', async () => {
    userModel.findByIdentifier.mockResolvedValue({ id: 1, password: 'hashed-p' });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token');

    const result = await login('u', 'p');

    expect(bcrypt.compare).toHaveBeenCalled();
    expect(jwt.sign).toHaveBeenCalledWith({ userId: 1 }, expect.any(String));
    expect(result).toEqual({ token: 'token' });
  });

  test('returns null when credentials invalid', async () => {
    userModel.findByIdentifier.mockResolvedValue({ id: 1, password: 'hashed-x' });
    bcrypt.compare.mockResolvedValue(false);

    const result = await login('u', 'p');
    expect(result).toBeNull();
  });

  test('returns null when user not found', async () => {
    userModel.findByIdentifier.mockResolvedValue(null);

    const result = await login('u', 'p');
    expect(result).toBeNull();
  });
});
