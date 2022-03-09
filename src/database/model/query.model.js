import mongoose from "mongoose";

const QuerySchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    telNumber: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim : true,
        lowercase: true
    },
    message: {
        type: String,
        required: true
    },
    sendDate: {
        type: Date,
        default: new Date()
    }
});

const Query = mongoose.model('Query', QuerySchema);
export default Query;