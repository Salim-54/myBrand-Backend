import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    introduction: {
        type: String,
        required: true
    },
    blogBody: {
        type: String,
        required: true
    },
    sendDate: {
        type: Date,
        default: new Date()
    }
});

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;