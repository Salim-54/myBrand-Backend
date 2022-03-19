import express from 'express';
import { subscribeToBlog, getAllSubscribers, unsubscribeToBlog } from '../controllers/subscriber.controller';
import { protect } from '../controllers/auth.controller';
import { restrictTo } from '../controllers/auth.controller';


const router = express.Router();

router.post("/",  subscribeToBlog);
router.get("/", protect, restrictTo('admin'), getAllSubscribers);
router.delete("/",restrictTo('admin'),unsubscribeToBlog);

export default router;