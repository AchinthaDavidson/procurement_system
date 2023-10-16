const request = require('supertest');
const express = require('express');
const app = express();
const siteRoutes = require('../routes/site'); // Import your Express site routes

app.use('/api/sites', siteRoutes); // Mount the site routes on '/api/sites'

describe('Site Routes', () => {
  it('should add a new site', (done) => {
    const siteData = {
      siteName: 'Test Site',
      location: 'Test Location',
      siteManagerName: 'Test Manager',
      budget: 1000,
    };

    request(app)
      .post('/api/sites/add')
      .send(siteData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.equal('save details');
        done();
      });
  });

  it('should get a list of sites', (done) => {
    request(app)
      .get('/api/sites')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should update a site with a valid ID', (done) => {
    const updatedSiteData = {
      siteManagerName: 'Updated Manager',
      budget: 2000,
    };

    // Replace 'validSiteId' with an actual site ID that exists in your database
    const validSiteId = 'validSiteId';

    request(app)
      .put(`/api/sites/update/${validSiteId}`)
      .send(updatedSiteData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.status).to.equal('manager updated');
        done();
      });
  });
});
