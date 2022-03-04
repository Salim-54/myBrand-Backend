import express from 'express';
import { getAllQueries, saveQuery } from '../controllers/query.controller';

const router = express.Router();

router.post('/', saveQuery);
router.get('/', getAllQueries);


export default router;