import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        required: true
    },
    blogBody: {
        type: String,
        required: true
    },
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
    sendDate: {
        type: Date,
        default: new Date()
    }
});

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;