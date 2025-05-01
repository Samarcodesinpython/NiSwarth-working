//backend/routes/donationRoutes.js

import express from 'express';
import * as donationController from '../controllers/donationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { getMyDonations } from '../controllers/donationController.js';


const router = express.Router();

// Protect routes that require login
router.post('/', protect, donationController.createDonation);
router.get('/my', protect, getMyDonations);
router.get('/', donationController.getAllDonations); // public
router.get('/:id', donationController.getDonationById); // public
router.put('/:id', protect, donationController.updateDonation); // protected
router.delete('/:id', protect, donationController.deleteDonation); // protected
router.patch('/:id/status', protect, donationController.updateDonationStatus); // protected

export default router;