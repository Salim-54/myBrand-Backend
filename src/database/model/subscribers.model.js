import mongoose from "mongoose";
import validator from "validator";


const SubscriberSchema = mongoose.Schema({

  email: {
    type: String,
    required: [true, 'Provide your email'],
    lowercase: true,
    validate: [validator.isEmail, 'Provide a valid email'],
    unique: true

  },
    

	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const Subscriber = mongoose.model("Subscriber", SubscriberSchema);
export default Subscriber;