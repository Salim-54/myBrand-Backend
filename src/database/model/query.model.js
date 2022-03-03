import mongoose from "mongoose";

const QuerySchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    telNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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