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


  let user = {

    email:req.body.email,
    password:req.body.password,
    name: req.body.name,
    role: req.body.role

  };


  let oldUser  = await User.findOne({ email: req.body.email });
  if (oldUser) {
      return res.status(400).json({ error: true, message: "You have already registered please Login" });
  }


    const newUser = await new User(user);
    newUser.save();

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        message: `Thank you ${newUser.name}, your account have been created successfully!!`
    })
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    //  Check if email and password exist
    if (!email || !password) {
     return   next(new AppError('Please provide email and password!', 400));
    }
    //  Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }
  
    // // If everything ok, send token to client
    // createSendToken(user, 200, res);

    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    });

  });


  exports.protect = catchAsync(async (req, res, next) => {
    // Getting token and check if it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    //   console.log(token);
    }
  
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
  
    // //  Verifying the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded);

    // // 3) Check if user still exists

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
  
    // // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  });  
  
  exports.restrictTo = (...roles) => {
    return (req, res, next) => {

      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
  
      next();
    };
  };



