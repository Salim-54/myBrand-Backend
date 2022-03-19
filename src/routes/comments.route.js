import express from 'express';
import { saveComment, getAllComments } from '../controllers/comments.controller'


const router = express.Router();

router.post('/:id', saveComment);
router.get('/', getAllComments);

export default router;