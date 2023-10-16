const request = require('supertest');
const express = require('express');
const app = express();
const supplierRoutes = require('../routes/supplier'); // Import your Express supplier routes

app.use('/api/suppliers', supplierRoutes); // Mount the supplier routes on '/api/suppliers'

describe('Supplier Routes', () => {
  it('should add a new supplier', (done) => {
    const supplierData = {
      companyName: 'Test Company',
      contactNumber: '1234567890',
      email: 'test@example.com',
      password: 'testpassword',
    };

    request(app)
      .post('/api/suppliers/add')
      .send(supplierData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.equal('save details');
        done();
      });
  });

  it('should log in a supplier with valid credentials', (done) => {
    const loginData = {
      email: 'test@example.com',
      password: 'testpassword',
    };

    request(app)
      .post('/api/suppliers/login')
      .send(loginData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should handle invalid login credentials', (done) => {
    const invalidLoginData = {
      email: 'test@example.com',
      password: 'invalidpassword', // This is intentionally incorrect
    };

    request(app)
      .post('/api/suppliers/login')
      .send(invalidLoginData)
      .expect(401) // Assuming you return a 401 status code for authentication failure
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
