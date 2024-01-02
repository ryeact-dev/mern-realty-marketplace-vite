import express from 'express';
import {
  createListing,
  deleteListing,
  getSingleListing,
  updateListing,
} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/single/:listingId', verifyToken, getSingleListing);
router.post('/create', verifyToken, createListing);
router.patch('/update/:id', verifyToken, updateListing);
router.delete('/delete/:id', verifyToken, deleteListing);

export default router;
