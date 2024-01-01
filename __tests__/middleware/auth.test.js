// Import necessary modules and dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const authMiddleware = require('./auth');

// Mocking the required modules
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

jest.mock('../models/users', () => ({
  findById: jest.fn(),
}));

// Mock Express request and response objects
const req = {
  headers: {
    authorization: 'Bearer mockToken',
  },
};

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

// Test suite for the auth middleware
describe('Auth Middleware', () => {
  it('should call next() and set req.user if token is valid', async () => {
    // Mocking the behavior of jwt.verify and User.findById
    jwt.verify.mockReturnValueOnce({ userId: 'mockUserId' });
    User.findById.mockResolvedValueOnce({ _id: 'mockUserId', username: 'mockUser' });

    // Call the auth middleware
    await authMiddleware(req, res, jest.fn());

    // Assertions
    expect(jwt.verify).toHaveBeenCalledWith('mockToken', process.env.JWT_SECRET);
    expect(User.findById).toHaveBeenCalledWith('mockUserId');
    expect(req.user).toEqual({ _id: 'mockUserId', username: 'mockUser' });
  });

  it('should return 401 if token is missing', async () => {
    // Modify the request to have no authorization header
    delete req.headers.authorization;

    // Call the auth middleware
    await authMiddleware(req, res, jest.fn());

    // Assertions
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });

  it('should return 401 if token is invalid', async () => {
    // Mocking the behavior of jwt.verify to throw an error
    jwt.verify.mockImplementationOnce(() => {
      throw new Error('Invalid token');
    });

    // Call the auth middleware
    await authMiddleware(req, res, jest.fn());

    // Assertions
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
  });

  // Add more test cases as needed for your specific requirements
});