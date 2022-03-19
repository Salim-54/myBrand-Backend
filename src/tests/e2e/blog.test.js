import app from '../../app';
import chai, { expect, request } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import express  from 'express';

import 'dotenv/config';


//blog




chai.use(chaiHttp);

//sign up
describe('POST API /api/v1/users/signup', () => {
    before(() => {
        mongoose.connection.dropCollection('signup');
    })
    const user = {
        name: "Peter20",
        role:"admin",
        email: "salim@gmail.com",
        password: "salim123"
    }

    it('it should create a user and return 201', (done) => {
        const already = user.email

        chai.request(app)
            .post('/api/v1/users/signup')
            .send(user)
            .end((err, res) => {
                if (err) return done(err)
                if (!already){

                    // expect(res.status).to.be.eql(201)
                    expect(res.status(201).json({
                        status: 'success',
                        token,
                        data: {
                            user: newUser
                        }
                    }));
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
        password: "salim123",

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
                expect(res.status).to.be.equal(401);
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
        
        // // //post blog
        
        describe('POST API /api/v1/blogs', () => {
        before(() => {
            mongoose.connection.dropCollection('blog');
        })
        
        const blog = {
            title: "jjjko",
            blogBody:"rejkeioeeey",
            introduction:"sjdhjakhdehruiew"
        }
        
        let hasBlog = blog.introduction
        
        
        it('it should successfully create a new blog and return 201', (done) => {
            chai.request(app)
                .post('/api/v1/blogs')
                .set("Authorization", `Bearer ${token}`)
                .send(blog)
        
            .end((err, res) => {
                if (err) return done(err)
                if (!hasBlog){
                    expect(res.status).to.be.equal(201);
                    expect(res.body).to.haveOwnProperty('data');
                }
        
                return done();
            })
        });
        
        });

    // should get list of blogs
    describe('GET API /api/v1/blogs', () => {
        before(() => {
            mongoose.connection.dropCollection('blog');
        })
                
        const blog = {
            title: "jjjko",
            blogBody:"rejkeioeeey",
            introduction:"sjdhjakhdehruiew"
        }
        
        let hasBlog = blog.introduction
        
        
        it('it should successfully Get all Blogs( Blog list!! )', (done) => {
            chai.request(app)
                .post('/api/v1/blogs')
                .set("Authorization", `Bearer ${token}`)
                .send(blog)
        
            .end((err, res) => {
                if (err) return done(err)
                chai.request(app).get('/api/v1/blogs')
                            .end((err, res) => {
                                if (err) return done(err);
                                if (hasBlog){
                                
                                expect(res.status).to.be.eql(200);
                                expect(res.body).to.haveOwnProperty('data')

                            }
                            
                return done();
            })
    });
  });
});

    // should get a particular  blog by its id!


    describe('GET API /api/v1/blogs/:id', () => {
        before(() => {
            mongoose.connection.dropCollection('blog');
        })
                
        const blog = {
            title: "jjjko",
            blogBody:"rejkeioeeey",
            introduction:"sjdhjakhdehruiew"
        }
        
        let hasBlog = blog.introduction
        let blogId;
        
        it('it should successfully Get a particular blog by its id!!', (done) => {
            chai.request(app)
                .post('/api/v1/blogs')
                .set("Authorization", `Bearer ${token}`)
                .send(blog)
        
            .end((err, res) => {
                if (err) return done(err)
                if (hasBlog){
                blogId = res.body.data._id;
                chai.request(app).get('/api/v1/blogs/' + blogId)
                            .end((err, res) => {
                                if (err) return done(err);
                                expect(res.status).to.be.eql(200)
                                                            
                return done();
            })}
    });
  });
});


});

    

