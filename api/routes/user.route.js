import express from 'express';

// Controllers
import { test, updateUserInfo } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.patch('/update/:id', verifyToken, updateUserInfo);

export default router;
