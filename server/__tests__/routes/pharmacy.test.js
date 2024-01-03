const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const pharmacyRoute = require('./../../routes/pharmacy');

const app = express();
app.use(bodyParser.json());
app.use('/api', pharmacyRoute);

// Mock the connectDB function
jest.mock('./../../helpers/dbMongoose');
const connectDB = require('./../../helpers/dbMongoose');
connectDB.mockImplementation(() => {
  // Mock the database connection if needed
});

// Mock the auth middleware
jest.mock('./../../middleware/auth', () => {
  return (req, res, next) => {
    req.user = { id: '6594d6347d3c60852a9f3114' }; 
    next();
  };
});

// Mock the userSchema and pharmacySchema
const userSchema = require('./../../models/users');
const pharmacySchema = require('./../../models/pharmacySchema');
jest.mock('./../../models/users');
jest.mock('./../../models/pharmacySchema');

// ... (existing imports and setup)

describe('POST /api/addcomment', () => {
    it('should add a comment to the pharmacy and return updated data', async () => {
      // Mock the userSchema findById function
      userSchema.findById.mockResolvedValueOnce({ name: 'John Doe' });
  
      // Mock the pharmacySchema findOneAndUpdate function
      pharmacySchema.findOneAndUpdate.mockResolvedValueOnce({
        _id: '6594d6b47d3c60852a9f311c',
        comments: [
          { content: 'Old comment', user_name: 'Alice' },
        ],
      });
  
      const response = await request(app)
        .post('/api/addcomment')
        .set('Authorization', 'Bearer mocked_token')
        .send({
          pharmId: '6594d6b47d3c60852a9f311c',
          comment: 'New comment',
          patientId: 'patientId123',
        });
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        pharmacyData: [
          {
            content: 'Old comment',
            user_name: 'Alice',
          },
        ],
      });
    });
  
    // Cleanup after all tests if necessary
    afterAll(() => {
      jest.resetAllMocks();
    });
  });
  