// users.test.js

const request = require('supertest'); 
const express = require('express');
const bodyParser = require('body-parser');
const registerPatientRoute = require('./path-to-registerPatient-route'); // Adjust the path accordingly
const connectDB = require('./path-to-connectDB-function'); // Adjust the path accordingly
const User = require('./path-to-User-model'); // Adjust the path accordingly

const app = express();
app.use(bodyParser.json());
app.use('/api', registerPatientRoute); // Assume your route is under '/api/registerPatient'

jest.mock('./path-to-connectDB-function'); // Mock the connectDB function

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
