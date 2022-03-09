import express from 'express';
import { getAllBlogs, saveBlog, getBlogById, updateBlogById, deleteBlogById } from '../controllers/blog.controller';

const router = express.Router();

router.post('/', saveBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.patch('/:id', updateBlogById);
router.delete('/:id', deleteBlogById);





export default router;