const request = require('supertest');
const express = require('express');
const app = express();
const productRoutes = require('../routes/Product'); // Import your Express product routes

app.use('/api/products', productRoutes); // Mount the product routes on '/api/products'

describe('Product Routes', () => {
  it('should add a new product', (done) => {
    const productData = {
      pname: 'Test Product',
      qty: 10,
      supplier_id: '123',
    };

    request(app)
      .post('/api/products/add')
      .send(productData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.equal('save details');
        done();
      });
  });

  it('should get a list of products', (done) => {
    request(app)
      .get('/api/products')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should handle validation error for qty', (done) => {
    const invalidProductData = {
      pname: 'Invalid Product',
      qty: 'Not a Number', // This is intentionally invalid
      supplier_id: '123',
    };

    request(app)
      .post('/api/products/add')
      .send(invalidProductData)
      .expect(422) // Assuming you return a 422 status code for validation errors
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
