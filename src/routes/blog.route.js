import express from 'express';
import { getAllBlogs, saveBlog, getBlogById, updateBlogById, deleteBlogById } from '../controllers/blog.controller';
import { protect } from '../controllers/auth.controller';
import { restrictTo } from '../controllers/auth.controller';
import multer from 'multer';


const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("invalid image file!", false);
    }
};
const uploads = multer({ storage, fileFilter });




const router = express.Router();

router.post('/',protect, uploads.single("image"), saveBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.patch('/:id',protect,restrictTo('admin'), updateBlogById);
router.delete('/:id',protect,restrictTo('admin'), deleteBlogById);





export default router;