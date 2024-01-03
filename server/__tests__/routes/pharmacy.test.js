// pharmacy.test.js

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Import jwt library

const pharmacyRoute = require('./../../routes/pharmacy'); 
const connectDB = require('./../../helpers/dbMongoose');
const pharmacySchema = require('./../../models/pharmacySchema'); 
const userSchema = require('./../../models/users'); // Import userSchema

const app = express();
app.use(bodyParser.json());
app.use('/api', pharmacyRoute);

jest.mock('./../../helpers/dbMongoose'); // Mock the connectDB function

// Test for /pharmacyinfo
describe('POST https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/pharmacyinfo', () => {
  it('should return pharmacy data for a valid pharmId with proper authentication', async () => {
    // Assuming you have a valid pharmId in your database
    const validPharmId = '65959c645f9ebf0cc78319d1';

    // Mock the findById method to return a valid pharmacy
    jest.spyOn(pharmacySchema, 'findById').mockResolvedValueOnce({
      _id: validPharmId,
      location: {
        type: 'Point',
        coordinates: [27.178820055290462, 38.45874855641927],
      },
      ownerId: '65959c645f9ebf0cc78319cf',
      name: 'İdeal Eczanesi',
      isPremium: false,
      pharmImages: [
        'https://imagedelivery.net/lbITvo6WrXsIJ-kdtTR0dg/3cdcdcc5-20a1-4c7e-04d6-1366965b9f00/public',
      ],
      drugs: {
        pedifen: 0,
        aspirin: 0,
        parol: 50,
        brufen: 0,
        naprosyn: 9,
        prilosec: 6,
        zocor: 0,
        norvasc: 4,
        canesten: 0,
        dartin: 0,
        benadryl: 0,
        ase: 3,
        lopressor: 6,
        itor: 7,
        protonbe: 9,
        zantac: 1,
        olor: 7,
        prozac: 3,
        valu: 3,
        voltaren: 8,
        latace: 0,
        neurontin: 0,
      },
      address: 'Yıldırım Caddesi, Çiçek Mahallesi',
      description: 'Tüm sağlik sorunlariniza çözüm sunuyoruz.',
      phoneNum: '+907893290550',
      rating: {
        totalRatings: 0,
        raters: [],
      },
      comments: [],
      createdAt: '2024-01-03T17:41:56.323Z',
      updatedAt: '2024-01-03T17:47:42.833Z',
      __v: 0,
    });

    // Create a valid JWT token for authentication
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ3MWI5ZjA2MmMwYjJiY2JiZjNlZCIsImVtYWlsIjoib21lckBob3RtYWlsLmNvbSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6Im9tZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRkdjMxdm4vRHhWLjdmbHJ2QnZneVF1LlVnMHFCZ2lORUd1NE82R3NOcXNFdExBOW8veWVBUyIsIl9fdiI6MH0sImlhdCI6MTcwNDI0NDQ4MX0.3mQttReZ1r6oQlVHjI75gIKYfUpFkfEi_6S37LPC6go';

    const response = await request('https://astonishing-capybara-516671.netlify.app')
    .post('/.netlify/functions/index/pharmacyinfo')
    .set('Authorization', `Bearer ${token}`)
    .send({ pharmId: validPharmId });

    expect(response.status).toBe(200);

    // Check if the response contains the 'pharmacyData' attribute
    expect(response.body).toHaveProperty('pharmacyData');

    // Check if the 'pharmacyData' attribute is not empty
    expect(response.body.pharmacyData).toBeTruthy();

    // Check the presence and non-emptiness of specific attributes
    expect(response.body.pharmacyData).toHaveProperty('_id');
    expect(response.body.pharmacyData._id).toBeTruthy();

    expect(response.body.pharmacyData).toHaveProperty('location');
    expect(response.body.pharmacyData.location).toBeTruthy();

    expect(response.body.pharmacyData).toHaveProperty('ownerId');
    expect(response.body.pharmacyData.ownerId).toBeTruthy();

    expect(response.body.pharmacyData).toHaveProperty('name');
    expect(response.body.pharmacyData.name).toBeTruthy();

    expect(response.body.pharmacyData).toHaveProperty('isPremium');
    expect(response.body.pharmacyData.isPremium).toBeDefined();

  });

  it('should return an error for an invalid pharmId with proper authentication', async () => {
    // Assuming you have an invalid pharmId that does not exist in your database
    const invalidPharmId = 'invalid_pharmId';

    // Mock the findById method to return null (pharmacy not found)
    jest.spyOn(pharmacySchema, 'findById').mockResolvedValueOnce(null);

    // Create a valid JWT token for authentication
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ3MWI5ZjA2MmMwYjJiY2JiZjNlZCIsImVtYWlsIjoib21lckBob3RtYWlsLmNvbSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6Im9tZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRkdjMxdm4vRHhWLjdmbHJ2QnZneVF1LlVnMHFCZ2lORUd1NE82R3NOcXNFdExBOW8veWVBUyIsIl9fdiI6MH0sImlhdCI6MTcwNDI0NDQ4MX0.3mQttReZ1r6oQlVHjI75gIKYfUpFkfEi_6S37LPC6go';

    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .post('/.netlify/functions/index/pharmacyinfo')
      .set('Authorization', `Bearer ${token}`)
      .send({ pharmId: invalidPharmId });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Pharmacy not found' });
  });

});


// Test for /getPharmDetail
describe('GET https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/getPharmDetail', () => {
  it('should return pharmacy data for a valid userId with proper authentication', async () => {
    // Assuming you have a valid userId in your database
    const validUserId = '65959c645f9ebf0cc78319cf';

    // Mock the findOne method to return a valid pharmacy
    jest.spyOn(pharmacySchema, 'findOne').mockResolvedValueOnce({
      _id: '65959c645f9ebf0cc78319d1',
      location: {
        type: 'Point',
        coordinates: [27.178820055290462, 38.45874855641927],
      },
      ownerId: validUserId,
      name: 'İdeal Eczanesi',
      isPremium: false,
      pharmImages: [
        'https://imagedelivery.net/lbITvo6WrXsIJ-kdtTR0dg/3cdcdcc5-20a1-4c7e-04d6-1366965b9f00/public',
      ],
      drugs: {
        pedifen: 0,
        aspirin: 0,
        parol: 50,
        brufen: 0,
        naprosyn: 9,
        prilosec: 6,
        zocor: 0,
        norvasc: 4,
        canesten: 0,
        dartin: 0,
        benadryl: 0,
        ase: 3,
        lopressor: 6,
        itor: 7,
        protonbe: 9,
        zantac: 1,
        olor: 7,
        prozac: 3,
        valu: 3,
        voltaren: 8,
        latace: 0,
        neurontin: 0,
      },
      address: 'Yıldırım Caddesi, Çiçek Mahallesi',
      description: 'Tüm sağlik sorunlariniza çözüm sunuyoruz.',
      phoneNum: '+907893290550',
      rating: {
        totalRatings: 0,
        raters: [],
      },
      comments: [],
      createdAt: '2024-01-03T17:41:56.323Z',
      updatedAt: '2024-01-03T17:47:42.833Z',
      __v: 0,
    });

    // Create a valid JWT token for authentication
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ3MWI5ZjA2MmMwYjJiY2JiZjNlZCIsImVtYWlsIjoib21lckBob3RtYWlsLmNvbSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6Im9tZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRkdjMxdm4vRHhWLjdmbHJ2QnZneVF1LlVnMHFCZ2lORUd1NE82R3NOcXNFdExBOW8veWVBUyIsIl9fdiI6MH0sImlhdCI6MTcwNDI0NDQ4MX0.3mQttReZ1r6oQlVHjI75gIKYfUpFkfEi_6S37LPC6go';

    const response = await request('https://astonishing-capybara-516671.netlify.app')
    .get('/.netlify/functions/index/getPharmDetail')
    .set('Authorization', `Bearer ${token}`)
    .query({ userId: validUserId });

    expect(response.status).toBe(200);

    // Check the presence and non-emptiness of specific attributes
    expect(response.body).toHaveProperty('_id');
    expect(response.body._id).toBeTruthy();

    expect(response.body).toHaveProperty('location');
    expect(response.body.location).toBeTruthy();

    expect(response.body).toHaveProperty('ownerId');
    expect(response.body.ownerId).toBeTruthy();

    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toBeTruthy();

    expect(response.body).toHaveProperty('isPremium');
    expect(response.body.isPremium).toBeDefined();

  });

  it('should return an error for an invalid userId with proper authentication', async () => {
    // Assuming you have an invalid userId that does not exist in your database
    const invalidUserId = 'invalid_user_id';

    // Mock the findOne method to return null (pharmacy not found)
    jest.spyOn(pharmacySchema, 'findOne').mockResolvedValueOnce(null);

    // Create a valid JWT token for authentication
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ3MWI5ZjA2MmMwYjJiY2JiZjNlZCIsImVtYWlsIjoib21lckBob3RtYWlsLmNvbSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6Im9tZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRkdjMxdm4vRHhWLjdmbHJ2QnZneVF1LlVnMHFCZ2lORUd1NE82R3NOcXNFdExBOW8veWVBUyIsIl9fdiI6MH0sImlhdCI6MTcwNDI0NDQ4MX0.3mQttReZ1r6oQlVHjI75gIKYfUpFkfEi_6S37LPC6go';

    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .get('/.netlify/functions/index/getPharmDetail')
      .set('Authorization', `Bearer ${token}`)
      .query({ userId: invalidUserId });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Pharmacy not found' });
  });

});

// Test for /addcomment
describe('POST https://astonishing-capybara-516671.netlify.app/.netlify/functions/index/addcomment', () => {
  it('should add a comment to the pharmacy data for a valid pharmId and patientId with proper authentication', async () => {
    // Assuming you have a valid pharmId and patientId in your database
    const validPharmId = '65959c645f9ebf0cc78319d1';
    const validPatientId = '659306549cc142f020ad4803';

    // Mock the findById method for the patient
    jest.spyOn(userSchema, 'findById').mockResolvedValueOnce({
      _id: validPatientId,
      name: 'omer', // Assuming the patient has a name property
    });

    // Mock the findOneAndUpdate method to return updated pharmacy data
    jest.spyOn(pharmacySchema, 'findOneAndUpdate').mockResolvedValueOnce({
      _id: validPharmId,
      comments: [
        {
          content: 'example comment3',
          user_name: 'omer',
        },
        {
          content: 'example comment3',
          user_name: 'omer',
        },
      ],
    });

    // Create a valid JWT token for authentication
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ3MWI5ZjA2MmMwYjJiY2JiZjNlZCIsImVtYWlsIjoib21lckBob3RtYWlsLmNvbSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6Im9tZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRkdjMxdm4vRHhWLjdmbHJ2QnZneVF1LlVnMHFCZ2lORUd1NE82R3NOcXNFdExBOW8veWVBUyIsIl9fdiI6MH0sImlhdCI6MTcwNDI0NDQ4MX0.3mQttReZ1r6oQlVHjI75gIKYfUpFkfEi_6S37LPC6go';

    const response = await request('https://astonishing-capybara-516671.netlify.app')
    .post('/.netlify/functions/index/addcomment')
    .set('Authorization', `Bearer ${token}`)
    .send({
      pharmId: validPharmId,
      comment: 'example comment3',
      patientId: validPatientId,
    });

    expect(response.status).toBe(200);

    // Check the presence and non-emptiness of specific attributes in the response
    expect(response.body).toHaveProperty('pharmacyData');
    expect(response.body.pharmacyData).toBeTruthy();

    expect(response.body.pharmacyData).toHaveProperty('0.content');
    expect(response.body.pharmacyData[0].content).toBeTruthy();

    expect(response.body.pharmacyData).toHaveProperty('0.user_name');
    expect(response.body.pharmacyData[0].user_name).toBeTruthy();

  });

  it('should handle an error when adding a comment with an invalid pharmId', async () => {
    // Assuming you have an invalid pharmId and a valid patientId in your database
    const invalidPharmId = 'invalid_pharmId';
    const validPatientId = '659306549cc142f020ad4803';
  
    // Mock the findById method for the patient
    jest.spyOn(userSchema, 'findById').mockResolvedValueOnce({
      _id: validPatientId,
      name: 'omer', // Assuming the patient has a name property
    });
  
    // Mock the findOneAndUpdate method to return null (pharmacy not found)
    jest.spyOn(pharmacySchema, 'findOneAndUpdate').mockResolvedValueOnce(null);
  
    // Create a valid JWT token for authentication
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1OTQ3MWI5ZjA2MmMwYjJiY2JiZjNlZCIsImVtYWlsIjoib21lckBob3RtYWlsLmNvbSIsInBhc3RQcmVzY3JpcHRpb25zIjpbXSwidXNlclJvbGUiOiIxIiwibmFtZSI6Im9tZXIiLCJwYXNzd29yZCI6IiQyYiQxMCRkdjMxdm4vRHhWLjdmbHJ2QnZneVF1LlVnMHFCZ2lORUd1NE82R3NOcXNFdExBOW8veWVBUyIsIl9fdiI6MH0sImlhdCI6MTcwNDI0NDQ4MX0.3mQttReZ1r6oQlVHjI75gIKYfUpFkfEi_6S37LPC6go';
  
    const response = await request('https://astonishing-capybara-516671.netlify.app')
      .post('/.netlify/functions/index/addcomment')
      .set('Authorization', `Bearer ${token}`)
      .send({
        pharmId: invalidPharmId,
        comment: 'example comment3',
        patientId: validPatientId,
      });
  
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Invalid pharmId' });
  });
  
});