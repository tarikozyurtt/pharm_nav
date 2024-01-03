// pharmacy.test.js

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Import jwt library

const pharmacyRoute = require('./../../routes/pharmacy'); 
const connectDB = require('./../../helpers/dbMongoose');
const pharmacySchema = require('./../../models/pharmacySchema'); 

const app = express();
app.use(bodyParser.json());
app.use('/api', pharmacyRoute);

jest.mock('./../../helpers/dbMongoose'); // Mock the connectDB function

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
    expect(response.body).toEqual({
      pharmacyData: {
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
      },
    });
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
