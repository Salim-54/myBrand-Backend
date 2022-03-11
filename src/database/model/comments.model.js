import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    commentBody: {
        type: String,
        required: true
    },
    sendDate: {
        type: Date,
        default: new Date()
    }
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;
