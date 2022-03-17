import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"



const userSchema = new mongoose.Schema({

  
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
   role:{
    type: String,
    enum: ['normal-user', 'admin'],
    default: 'normal-user'
  },
  email: {
    type: String,
    required: [true, 'Provide your email'],
    // unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
   },
  // passwordConfirm: {
  //   type: String,
  //   required: [true, 'Please confirm your password'],
  //   validate: {
  //     // This only works on CREATE and SAVE!!!
  //     validator: function(el) {
  //       return el === this.password;
  //     },
  //     message: 'Passwords are not the same!'
  //   }
  // }

});

userSchema.pre('save', async function(next) {
  // only run if pw has modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  //delete pw
  // this.passwordConfirm = undefined;
  // next();

});

// CHECKING IF PASSWORD IS CORRECT

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
  return await bcrypt.compare(candidatePassword, userPassword);
};


const User = mongoose.model('User', userSchema);

module.exports = User;