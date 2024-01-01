// users.test.js

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Adjust these paths based on your project structure
const registerPatientRoute = require('../routes/users'); // Assuming the route is in 'routes' folder and named 'users.js'
const connectDB = require('../helpers/dbMongoose'); // Assuming the 'dbMongoose.js' file is in the 'helpers' folder
const User = require('../models/users'); // Assuming the 'users.js' file is in the 'models' folder

const app = express();
app.use(bodyParser.json());
app.use('/api', registerPatientRoute);

jest.mock('../helpers/dbMongoose'); // Mock the connectDB function

describe('POST /api/registerPatient', () => {
  it('should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      userRole: 'patient',
    };

    const saveMock = jest.spyOn(User.prototype, 'save').mockResolvedValueOnce();
    
    const response = await request(app)
      .post('/api/registerPatient')
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      userName: userData.name,
      userEmail: userData.email,
      userId: expect.any(String),
    });
    expect(saveMock).toHaveBeenCalledWith(); // You can add more specific checks if needed
  });

});
