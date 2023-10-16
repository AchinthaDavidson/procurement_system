const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes/order'); 

// Attach the router to your Express app
app.use('/order', router);

describe('Order Routes', () => {
  it('should add a new order', async () => {
    const orderData = {
      item: 'Test Item',
      qty: 5,
      siteid: '123',
    };

    const response = await request(app)
      .post('/api/add')
      .send(orderData)
      .expect(200);

    expect(response.body).toBe('save details');
  });

  it('should handle validation error for qty', async () => {
    const invalidOrderData = {
      item: 'Invalid Item',
      qty: 'Not a Number', // This is intentionally invalid
      siteid: '123',
    };

    const response = await request(app)
      .post('/api/add')
      .send(invalidOrderData)
      .expect(422); // Assuming you return a 422 status code for validation errors
  });

  it('should handle error for missing item', async () => {
    const invalidOrderData = {
      qty: 5,
      siteid: '123',
    };

    const response = await request(app)
      .post('/api/add')
      .send(invalidOrderData)
      .expect(500); // You should set an appropriate status code for this error
  });
});
