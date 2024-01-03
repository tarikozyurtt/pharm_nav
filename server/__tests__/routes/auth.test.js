const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require('./../../helpers/dbMongoose');
const User = require('./../../models/users');
const app = express();
const authRoute = require('./../../routes/auth'); // Adjust the path accordingly

app.use(bodyParser.json());

// Mock the connectDB function
jest.mock('./../../helpers/dbMongoose');

// Mock the bcrypt.compare function
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

// Mock the jwt.sign function
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

// Use the auth route
app.use('/.netlify/functions/index', authRoute);

describe('POST https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/authenticate', () => {
  it('should authenticate user and return token and user info', async () => {
    const userData = {
      userRole: "1",
      email: 'omer@hotmail.com',
      password: 'omer',
      name: 'omer',
    };

    const mockUser = new User({
      name: 'omer',
      email: userData.email,
      password: "$2b$10$dv31vn/DxV.7flrvBvgyQu.Ug0qBgiNEGu4O6GsNqsEtLA9o/yeAS", // replace with a hashed password
      // other user data...
    });

    // Mock the User.findOne function to return the mockUser
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(mockUser);

    // Mock the bcrypt.compare function to return true
    bcrypt.compare.mockResolvedValueOnce(true);

    // Mock the jwt.sign function to return a token
    jwt.sign.mockReturnValueOnce('mocked_token');

    const response = await request(app)
      .post('/.netlify/functions/index/authenticate')
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      userToken: 'mocked_token',
      userInfo: {
        userName: 'omer',
        userEmail: 'omer@hotmail.com',
        userId: expect.any(String),
      },
    });
  });

  
});
