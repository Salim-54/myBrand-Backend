import express from "express";
import { getAllUsers,getUserById } from '../controllers/user.controller';
import { signup, login } from '../controllers/auth.controller';
import { protect } from '../controllers/auth.controller';
import { restrictTo } from '../controllers/auth.controller';


const router = express.Router();

router.get('/', protect, protect,restrictTo('admin'), getAllUsers);
router.get('/:id', protect, protect,restrictTo('admin'), getUserById);

// AUTH

router.post('/signup', signup);
router.post('/login', login);



export default router;