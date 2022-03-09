import { promisify } from 'util';
import jwt from "jsonwebtoken";
import User from '../database/model/user.model';
import catchAsync from '../utils/catchAsync';
import AppError from './../utils/appError';


// FUNCTION FOR CREATING JWT TOKES:

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}


// SIGNING UP NEW USER WITH TOKEN TO LOGIN IMMEDIATELY

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
});


