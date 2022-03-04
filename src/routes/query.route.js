import express from 'express';
import { getAllQueries, saveQuery, getQueryById } from '../controllers/query.controller';

const router = express.Router();

router.post('/', saveQuery);
router.get('/', getAllQueries);
router.get('/:id', getQueryById);


export default router;



