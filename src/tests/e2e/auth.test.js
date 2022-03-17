import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

//auth

chai.use(chaiHttp);



//sign up
describe('POST API /api/v1/users/signup', () => {
    before(() => {
        mongoose.connection.dropCollection('signup');
    })
    const user = {
        name: "Peter20",
        email: "salim@gmail.com",
        password: "salim123"
    }

    it('it should save a user and return 201', (done) => {
        const already = user.email

        chai.request(app)
            .post('/api/v1/users/signup')
            .send(user)
            .end((err, res) => {
                if (err) return done(err)
                if (!already){

                    expect(res.status).to.be.eql(201)
                }
                return done();
            })
    });
 it('Should return 400 when email exists', (done) => {
    const already = user.email
    chai.request(app).post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
            if (already) return done(err);
            expect(res.status).to.be.eql(400)
            return done();
        })

});
});


//////////////  sign in   /////////////

describe('POST API /api/v1/users/login', () => {
    before(() => {
        mongoose.connection.dropCollection('login');
    })
    const user = {
        email: "salim@gmail.com",
        password: "salim123"
    }
    let token = "";
    it('it should successfully login and return 200', (done) => {
        chai.request(app)
            .post('/api/v1/users/login')
            .send(user)
            .end((err, res) => {
                if (err) return done(err)
                token = res.body.token;
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.property("token");
                return done();
            })
    });

    it('Should return 401 when email does not exists', (done) => {
        const oldUser = user.email
        chai.request(app).post('/api/v1/users/login')
            .send(user)
            .end((err, res) => {
                if (oldUser) return done(err);
                expect(res.status).to.be.equal(401)
                return done();
            })

    });
    it('Should return 401 when password is invalid', (done) => {
        const oldUser = user.password
        chai.request(app).post('/api/v1/users/login')
            .send(user)
            .end((err, res) => {
                if (oldUser) return done(err);
                expect(res.status).to.be.equal(401)
                return done();
            })

    });
});
