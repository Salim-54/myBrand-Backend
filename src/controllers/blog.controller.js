import { blog } from 'express';
import Blog from '../database/model/blog.model';

exports.saveBlog  = async (req, res) => {

    try{

        const newBlog = await Blog.create(req.body);
        // await newBlog.save();
        res.status(201).json({
            status: 'Blog was successfully created!',
            data: {
            blog: newBlog
            }
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getAllBlogs = async (req, res) => {
    const blogs = await Blog.find();
    res.status(200).json({
        status: 'success',
        results: blogs.length, 
        data: {
            blogs
        }
    });
};

exports.getBlogById = async (req, res) => {
    try{
        
        const blog = await Blog.findById(req.params.id);
        res.status(200).json({
            status: 'success', 
            data: {
                blog
            }
        });
        // if(!blog) return res.status(404).json({success: false, message: "Blog not found"}) ;
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
            });
        }

};
exports.updateBlogById = async (req, res) => {
    try{
        
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success', 
            data: {
                blog
            }
        });
        // if(!blog) return res.status(404).json({success: false, message: "Blog not found"}) ;
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
            });
        }

};

exports.deleteBlogById = async (req, res) => {
    try{
        await Blog.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success', 
            data: null
        });
        // if(!blog) return res.status(404).json({success: false, message: "Blog not found"}) ;
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
            });
        }

}



