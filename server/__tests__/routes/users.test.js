// users.test.js

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Adjust these paths based on your project structure
const registerPatientRoute = require('./../../routes/users'); // Assuming the route is in 'routes' folder and named 'users.js'
const connectDB = require('./../../helpers/dbMongoose'); // Assuming the 'dbMongoose.js' file is in the 'helpers' folder
const User = require('./../../models/users'); // Assuming the 'users.js' file is in the 'models' folder

const app = express();
app.use(bodyParser.json());
app.use('/api', registerPatientRoute);

jest.mock('./../../helpers/dbMongoose'); // Mock the connectDB function

describe('POST https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/registerPatient', () => {
  it('should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe9@example.com',
      password: 'password123',
      userRole: 'patient',
    };

    const saveMock = jest.spyOn(User.prototype, 'save').mockResolvedValueOnce();

    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .post('/.netlify/functions/index/registerPatient')
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      userName: userData.name,
      userEmail: userData.email,
      userId: expect.any(String),
    });
    // expect(saveMock).toHaveBeenCalledWith(); // You can add more specific checks if needed

  });

  it('should handle duplicate email error', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe9@example.com',
      password: 'password123',
      userRole: 'patient',
    };

    jest.spyOn(User.prototype, 'save').mockRejectedValueOnce({
      code: 11000, // Simulate MongoDB duplicate key error
    });

    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .post('/.netlify/functions/index/registerPatient')
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Email already exists');
  });

  it('should handle missing required fields in the request body', async () => {
    // Omit the 'name' field to simulate a missing required field
    const userData = {
      email: 'john.doe3@example.com',
      password: 'password123',
      userRole: 'patient',
    };

    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .post('/.netlify/functions/index/registerPatient')
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Validation failed: Name, email, password, and userRole are required');
  });

});


// Test for /.netlify/functions/index/history
const historyRoute = require('./../../routes/users'); 

app.use(bodyParser.json());
app.use('/api', historyRoute);

jest.mock('./../../helpers/dbMongoose'); // Mock the connectDB function

describe('POST https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/history', () => {
  it('should return past prescriptions for a valid user', async () => {
    // Assuming you have a valid user in your database with past prescriptions
    const existingUser = new User({
      name: 'John Doe',
      email: 'john.doe9@example.com',
      password: 'password123',
      userRole: 'patient',
      pastPrescriptions: [],
    });

    await existingUser.save();

    const userData = {
      userId: existingUser._id, // Use the _id of the existing user
    };

    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .post('/.netlify/functions/index/history')
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      pastPrescriptions: existingUser.pastPrescriptions,
    });
  });

  // Add more test cases as needed
});