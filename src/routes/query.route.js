import express from 'express';
import { getAllQueries, saveQuery, getQueryById } from '../controllers/query.controller';
import { protect } from '../controllers/auth.controller';
import { restrictTo } from '../controllers/auth.controller';


const router = express.Router();

router.post('/', protect, saveQuery);
router.get('/', protect,restrictTo('admin'), getAllQueries);
router.get('/:id', protect,restrictTo('admin'), getQueryById);


export default router;



