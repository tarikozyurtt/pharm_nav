// users.test.js

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Import jwt library

const registerPatientRoute = require('./../../routes/users'); 
const connectDB = require('./../../helpers/dbMongoose');
const User = require('./../../models/users'); 
const Pharmacy = require('./../../models/pharmacySchema'); 

const app = express();
app.use(bodyParser.json());
app.use('/api', registerPatientRoute);

jest.mock('./../../helpers/dbMongoose'); // Mock the connectDB function

describe('POST https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/registerPatient', () => {
  it('should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'test_email_patient@example.com',
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
      email: 'test_email_patient@example.com',
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
      email: 'test_email_patient@example.com',
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

app.use('/api', historyRoute);

jest.mock('./../../helpers/dbMongoose'); // Mock the connectDB function

describe('POST https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/history', () => {
  it('should return past prescriptions for a valid user with proper authentication', async () => {
    // Assuming you have a valid user in your database with past prescriptions
    const existingUser = new User({
      name: 'John Doe',
      email: 'test_email@hotmail.com',
      password: 'password123',
      userRole: 'patient',
      pastPrescriptions: [],
    });

    await existingUser.save();

    const userData = {
      userId: existingUser._id, // Use the _id of the existing user
    };

    // Create a valid JWT token for authentication
    const token = jwt.sign({ userId: existingUser._id }, 'your_secret_key');

    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .post('/.netlify/functions/index/history')
      .set('Authorization', `Bearer ${token}`) // Set the Authorization header with the token
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      pastPrescriptions: existingUser.pastPrescriptions,
    });
  });

  // Add more test cases as needed
});

// Test for /.netlify/functions/index/registerPharmacist
const registerPharmacistRoute = require('./../../routes/users');

app.use('/api', registerPharmacistRoute);

jest.mock('./../../helpers/dbMongoose'); // Mock the connectDB function

describe('POST https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/registerPharmacist', () => {
  it('should register a new pharmacist and pharmacy', async () => {
    const userData = {
      userRole: '2',
      email: 'test_email_pharmacist@hotmail.com',
      password: 'test_omer2',
      name: 'test_omer2',
      pharmacyName: 'test_omer2',
      location: {
        type: 'Point',
        coordinates: [16, 16],
      },
    };

    const saveUserMock = jest.spyOn(User.prototype, 'save').mockResolvedValueOnce();

    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .post('/.netlify/functions/index/registerPharmacist')
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      pharmacyId: expect.any(String),
      userId: expect.any(String),
      userName: userData.name,
      userEmail: userData.email,
      pharmacyName: userData.pharmacyName,
      location: userData.location,
    });
    expect(saveUserMock).toHaveBeenCalled();
  });

  // Add more test cases as needed
});