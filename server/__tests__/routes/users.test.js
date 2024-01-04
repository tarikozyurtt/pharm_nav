// users.test.js

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Import jwt library

const registerPatientRoute = require('./../../routes/users'); 
const connectDB = require('./../../helpers/dbMongoose');
const User = require('./../../models/users'); 
const Pharmacy = require('./../../models/pharmacySchema'); 
const ticketSchema = require('./../../models/supportSchema'); 
const temp = require('tmp');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use('/api', registerPatientRoute);

jest.mock('./../../helpers/dbMongoose'); // Mock the connectDB function


/*
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
      name: 'history',
      email: 'history@hotmail.com',
      password: 'history',
      userRole: 'patient',
      pastPrescriptions: [],
    });

    await existingUser.save();

    const userData = {
      userId:  "6594b9e1c07812c0eca06001", // Use the _id of the existing user
    };

    // Create a valid JWT token for authentication
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ3MWI5ZjA2MmMwYjJiY2JiZjNlZCIsImVtYWlsIjoib21lckBob3RtYWlsLmNvbSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6Im9tZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRkdjMxdm4vRHhWLjdmbHJ2QnZneVF1LlVnMHFCZ2lORUd1NE82R3NOcXNFdExBOW8veWVBUyIsIl9fdiI6MH0sImlhdCI6MTcwNDI0NDQ4MX0.3mQttReZ1r6oQlVHjI75gIKYfUpFkfEi_6S37LPC6go';

    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .post('/.netlify/functions/index/history')
      .set('Authorization', `Bearer ${token}`) // Set the Authorization header with the token
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      pastPrescriptions: existingUser.pastPrescriptions,
    });
  });

  it('should return 401 for an invalid token', async () => {
    const userData = {
      userId: 'invalidUserId',
    };

    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .post('/.netlify/functions/index/history')
      .set('Authorization', 'Bearer invalidToken') // Set an invalid token
      .send(userData);

    expect(response.status).toBe(401);
  });
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
    
  });

  it('should handle duplicate email error and return 400 status', async () => {
    const userData = {
      userRole: '2',
      email: 'test_email_pharmacist@hotmail.com',
      password: 'test_password',
      name: 'test_user',
      pharmacyName: 'test_pharmacy',
      location: {
        type: 'Point',
        coordinates: [16, 16],
      },
    };
  
    // Mock the save method to throw a duplicate key error
    const saveUserMock = jest.spyOn(User.prototype, 'save').mockRejectedValueOnce({
      code: 11000, // MongoDB duplicate key error code
    });
  
    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .post('/.netlify/functions/index/registerPharmacist')
      .send(userData);
  
    expect(response.status).toBe(400);
    expect(response.text).toBe('Email already exists');
  });
  
});


// Test for /.netlify/functions/index/sendticket
const sendTicketRoute = require('./../../routes/users'); 

app.use('/api', sendTicketRoute);

describe('POST https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/sendticket', () => {
  it('should send a new ticket', async () => {
    const ticketData = {
      email: 'pharmacy_test@example.com',
      pharmacyName: 'pharmacy_test',
      pharmacistName: 'pharmacy_test',
      description: 'Test description for the ticket',
    };

    const saveTicketMock = jest.spyOn(ticketSchema.prototype, 'save').mockResolvedValueOnce();

    // Create a valid JWT token for authentication
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ3MWI5ZjA2MmMwYjJiY2JiZjNlZCIsImVtYWlsIjoib21lckBob3RtYWlsLmNvbSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6Im9tZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRkdjMxdm4vRHhWLjdmbHJ2QnZneVF1LlVnMHFCZ2lORUd1NE82R3NOcXNFdExBOW8veWVBUyIsIl9fdiI6MH0sImlhdCI6MTcwNDI0NDQ4MX0.3mQttReZ1r6oQlVHjI75gIKYfUpFkfEi_6S37LPC6go';

    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .post('/.netlify/functions/index/sendticket')
      .set('Authorization', `Bearer ${token}`)
      .send(ticketData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      email: ticketData.email,
      pharmacyName: ticketData.pharmacyName,
      pharmacistName: ticketData.pharmacistName,
      description: ticketData.description,
    });
    // expect(saveTicketMock).toHaveBeenCalled();
  });

  it('should handle duplicate ticket error', async () => {
    const ticketData = {
      email: 'pharmacy_test@example.com',
      pharmacyName: 'pharmacy_test',
      pharmacistName: 'pharmacy_test',
      description: 'Test description for the ticket',
    };

    jest.spyOn(ticketSchema.prototype, 'save').mockRejectedValueOnce({
      code: 11000, // Simulate MongoDB duplicate key error
    });

    // Create a valid JWT token for authentication
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ3MWI5ZjA2MmMwYjJiY2JiZjNlZCIsImVtYWlsIjoib21lckBob3RtYWlsLmNvbSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6Im9tZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRkdjMxdm4vRHhWLjdmbHJ2QnZneVF1LlVnMHFCZ2lORUd1NE82R3NOcXNFdExBOW8veWVBUyIsIl9fdiI6MH0sImlhdCI6MTcwNDI0NDQ4MX0.3mQttReZ1r6oQlVHjI75gIKYfUpFkfEi_6S37LPC6go';

    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .post('/.netlify/functions/index/sendticket')
      .set('Authorization', `Bearer ${token}`)
      .send(ticketData);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Ticket already exists');
  });
});


// Test for /.netlify/functions/index/image
const imageRoute = require('./../../routes/users');

app.use('/api', imageRoute);

describe('POST https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/image', () => {
  it('should upload an image and update pharmacy data', async () => {
    // Create a valid JWT token for authentication
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ3MWI5ZjA2MmMwYjJiY2JiZjNlZCIsImVtYWlsIjoib21lckBob3RtYWlsLmNvbSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6Im9tZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRkdjMxdm4vRHhWLjdmbHJ2QnZneVF1LlVnMHFCZ2lORUd1NE82R3NOcXNFdExBOW8veWVBUyIsIl9fdiI6MH0sImlhdCI6MTcwNDI0NDQ4MX0.3mQttReZ1r6oQlVHjI75gIKYfUpFkfEi_6S37LPC6go';

    // Assuming you have a valid pharmacy ID
    const pharmacyId = '6594b919c07812c0eca05fe9';

    // URL of an image from the internet resource
    const imageUrl = 'https://cdn.r10.net/editor/99180/c22b94955e3f7918255c7bf575bff8c8.jpg';

    // Fetch the image data from the internet
    const imageResponse = await request(imageUrl).get('');

    // Create a FormData instance
    const form = new FormData();
    form.append('file', imageResponse.body);

    // Send the request to upload the image
    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .post('/.netlify/functions/index/image')
      .set('Authorization', `Bearer ${token}`)
      .field('pharmacyId', pharmacyId)
      .attach('file', imageResponse.body, { filename: 'image.jpg' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'success',
      image: expect.any(String),
    });
  });

  it('should handle missing pharmacyId field', async () => {
    
    // Create a valid JWT token for authentication
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ3MWI5ZjA2MmMwYjJiY2JiZjNlZCIsImVtYWlsIjoib21lckBob3RtYWlsLmNvbSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6Im9tZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRkdjMxdm4vRHhWLjdmbHJ2QnZneVF1LlVnMHFCZ2lORUd1NE82R3NOcXNFdExBOW8veWVBUyIsIl9fdiI6MH0sImlhdCI6MTcwNDI0NDQ4MX0.3mQttReZ1r6oQlVHjI75gIKYfUpFkfEi_6S37LPC6go';

    const imageFile = createTempFile(); // Create a temporary image file for testing

    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .post('/.netlify/functions/index/image')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', imageFile.path, imageFile.name);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Pharmacy id is required');
  });
});


// Helper function to create a temporary image file for testing
function createTempFile() {
  const tempFile = temp.fileSync({ postfix: '.png' });

  // Static base64-encoded image string (replace with your own image data)
  const staticImageData = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAApElEQVR42mP8/w3MwA0NjAzZoIAiUAJjBgsM8F8ysC6A4Qg/A80ATiBmED3IAuA6IAngKIAMYEI6AkgBoMM5DJgEYgCMrAGPAigDEACiAGrgK4AOIAWgDmADbDKwBZAcQA4gClgMwA0YEbwA4QBoAkwBzBzACiGMEQwCIEBzIAZQIwB0wPzAMkADbwNwARoQgClgBgOMCQAMkCMBdwDXBzEC6jIKMF0GgEgAkgBgGGAAFQLMCsQAAAAAElFTkSuQmCC';

  // Decode the base64 string and write it to the temporary file
  const imageBuffer = Buffer.from(staticImageData, 'base64');
  fs.writeFileSync(tempFile.name, imageBuffer);

  return { path: tempFile.name, name: tempFile.name };
}
*/

// Test for /.netlify/functions/index/getCodeDrugs
const getCodeDrugsRoute = require('./../../routes/users');

app.use('/api', getCodeDrugsRoute);

jest.mock('./../../helpers/dbMongoose'); // Mock the connectDB function

describe('POST https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/getCodeDrugs', () => {
  it('should return drugs for a valid prescription code', async () => {
    // Assuming you have a valid prescription code in your database
    const validCode = 'S8ILQC';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ3MWI5ZjA2MmMwYjJiY2JiZjNlZCIsImVtYWlsIjoib21lckBob3RtYWlsLmNvbSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6Im9tZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRkdjMxdm4vRHhWLjdmbHJ2QnZneVF1LlVnMHFCZ2lORUd1NE82R3NOcXNFdExBOW8veWVBUyIsIl9fdiI6MH0sImlhdCI6MTcwNDI0NDQ4MX0.3mQttReZ1r6oQlVHjI75gIKYfUpFkfEi_6S37LPC6go';

    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .post('/.netlify/functions/index/getCodeDrugs')
      .set('Authorization', `Bearer ${token}`)
      .send({ code: validCode });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      drugs: expect.any(Object),
    });
  });

  it('should handle prescription not found', async () => {
    // Assuming you have an invalid prescription code in your database
    const invalidCode = 'invalid_code';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ3MWI5ZjA2MmMwYjJiY2JiZjNlZCIsImVtYWlsIjoib21lckBob3RtYWlsLmNvbSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6Im9tZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRkdjMxdm4vRHhWLjdmbHJ2QnZneVF1LlVnMHFCZ2lORUd1NE82R3NOcXNFdExBOW8veWVBUyIsIl9fdiI6MH0sImlhdCI6MTcwNDI0NDQ4MX0.3mQttReZ1r6oQlVHjI75gIKYfUpFkfEi_6S37LPC6go';

    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .post('/.netlify/functions/index/getCodeDrugs')
      .set('Authorization', `Bearer ${token}`)
      .send({ code: invalidCode });

    expect(response.status).toBe(400);
    expect(response.text).toBe('Prescription not found');
  });
  
});

