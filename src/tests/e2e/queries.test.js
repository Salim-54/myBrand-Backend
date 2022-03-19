import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import Query from '../../database/model/query.model';
import e from 'express';

chai.use(chaiHttp);
describe('POST API /api/v1/queries', () => {
    before(() => {
        mongoose.connection.dropCollection('inquiry');
    })
    const query = {
        "fullName": "Maneli",
        "telNumber": "0785454544",
        "email": "hki@gmail.com",
        "message": "okay viipi!"
    }
        // should successfully create a query
    it('it will create a query and return 201', (done) => {
        chai.request(app)
            .post('/api/v1/queries')
            .send(query)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.be.equal(201);

                expect(res.body).to.haveOwnProperty('data')
                return done();
            })
    });
}); 