import express from 'express';
import { getAllBlogs, saveBlog, getBlogById, updateBlogById, deleteBlogById } from '../controllers/blog.controller';
import { protect } from '../controllers/auth.controller';
import { restrictTo } from '../controllers/auth.controller';

const router = express.Router();

router.post('/',protect,restrictTo('admin'), saveBlog);
router.get('/',protect, getAllBlogs);
router.get('/:id',protect, getBlogById);
router.patch('/:id',protect,restrictTo('admin'), updateBlogById);
router.delete('/:id',protect,restrictTo('admin'), deleteBlogById);





export default router;