import express from 'express';
import { getAllQueries, saveQuery, getQueryById, deleteQueryById } from '../controllers/query.controller';
import { protect } from '../controllers/auth.controller';
import { restrictTo } from '../controllers/auth.controller';


const router = express.Router();

router.post('/', saveQuery);
router.get('/', protect,restrictTo('admin'), getAllQueries);
router.get('/:id', protect,restrictTo('admin'), getQueryById);
router.delete('/:id', protect,restrictTo('admin'), deleteQueryById);



export default router;



