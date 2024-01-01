import express from 'express';

// Controllers
import {
  deleteUser,
  test,
  updateUserInfo,
  getuserListings,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.patch('/update/:id', verifyToken, updateUserInfo);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getuserListings);

export default router;
