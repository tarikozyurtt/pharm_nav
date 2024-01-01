const request = require('supertest');
const app = require('../server/app');

describe('Express App', () => {
  it('should respond with "hello" on GET request to /', async () => {
    const response = await request(app).get('/.netlify/functions/index/apiV2');
    expect(response.status).toBe(200);
    expect(response.text).toBe('hello');
  });

  // Add more test cases for other routes or functionality as needed

  // Example test case for userRouter
  it('should respond with 200 on GET request to /users', async () => {
    const response = await request(app).get('/.netlify/functions/index/users');
    expect(response.status).toBe(200);
    // Add more assertions based on your specific use case
  });

  // Example test case for authRouter
  it('should respond with 401 on unauthorized access to /auth', async () => {
    const response = await request(app).post('/.netlify/functions/index/auth');
    expect(response.status).toBe(401);
    // Add more assertions based on your specific use case
  });

  // Example test case for pharmacyRouter
  it('should respond with 404 on non-existing route', async () => {
    const response = await request(app).get('/.netlify/functions/index/nonexistent');
    expect(response.status).toBe(404);
    // Add more assertions based on your specific use case
  });
});
