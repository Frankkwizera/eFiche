// tests/authController.test.js
const { register, login } = require('../controllers/authController');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

jest.mock('../models');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  describe('register', () => {
    it('should register a new user', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'password123',
          role: 'patient',
          fullName: 'Test User',
          age: 30,
          gender: 'Male',
          contactInfo: 'test@example.com'
        }
      };
      const res = {
        json: jest.fn()
      };

      User.create.mockResolvedValue({ id: 1, ...req.body });

      await register(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: 'User registered successfully',
        user: { id: 1, ...req.body }
      });
    });
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'password123'
        }
      };
      const res = {
        json: jest.fn()
      };

      User.findOne.mockResolvedValue({
        id: 1,
        username: 'testuser',
        password: await bcrypt.hash('password123', 10),
        role: 'patient'
      });

      jwt.sign.mockReturnValue('mockToken');

      await login(req, res);

      expect(res.json).toHaveBeenCalledWith({ token: 'mockToken' });
    });
  });
});