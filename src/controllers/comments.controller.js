import Blog from '../database/model/blog.model';
import Comment from '../database/model/comments.model';
import catchAsync from '../utils/catchAsync';

exports.saveComment = async (req, res, next) => {


  const blogId = req.params.id;
  const commentedOn = await Blog.findById(blogId)
    const newComment = await Comment.create({

      name: req.body.name,
      commentBody: req.body.commentBody,
      blogPost: commentedOn.title,
    });


const blogPost = await Blog.findById(blogId);
	blogPost.comments.push(newComment);
	await blogPost.save(function (error) {

    res.status(201).json({
      status: 'success',
      data: {
        comment: newComment
      }
    });
  });
}

exports.getAllComments = async (req, res) => {
    const comments = await Comment.find();
    res.status(200).json({
        status: 'success',
        results: comments.length, 
        data: {
            comments
        }
    });
};
