// backend/controllers/donationController.js
import Donation from '../models/Donation.js';

// Create a new donation
const createDonation = async (req, res) => {
    try {
      const donationData = {
        ...req.body,
        donorId: req.user._id, // ✅ attach user
      };
  
      const newDonation = new Donation(donationData);
      const savedDonation = await newDonation.save();
  
      // ✅ Optional: log saved donation for debugging
      console.log('✅ Saved Donation:', savedDonation);
  
      res.status(201).json(savedDonation);
    } catch (error) {
      console.error('❌ Donation Error:', error.message);
      res.status(500).json({ message: 'Failed to create donation', error: error.message });
    }
};
  
  

// Get all donations
const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find();
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch donations', error: error.message });
    }
};

// Get a single donation by ID
const getDonationById = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }
        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch donation', error: error.message });
    }
};

// Update a donation by ID
const updateDonation = async (req, res) => {
    try {
        const updatedDonation = await Donation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedDonation) {
            return res.status(404).json({ message: 'Donation not found' });
        }
        res.status(200).json(updatedDonation);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update donation', error: error.message });
    }
};

const getMyDonations = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const myDonations = await Donation.find({ donorId: userId });
  
      res.status(200).json(myDonations);
    } catch (error) {
      console.error('❌ Failed to fetch user donations:', error.message);
      res.status(500).json({ message: 'Failed to fetch user donations', error: error.message });
    }
};
  
// Delete a donation by ID
const deleteDonation = async (req, res) => {
    try {
        const deletedDonation = await Donation.findByIdAndDelete(req.params.id);
        if (!deletedDonation) {
            return res.status(404).json({ message: 'Donation not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete donation', error: error.message });
    }
};

const updateDonationStatus = async (req, res) => {
    console.log('🟢 PATCH /donations/:id/status called');

    try {
        const { status, userId, notes } = req.body;

        console.log(`Updating donation status for ID: ${req.params.id}`);  // Add this
        console.log(`Request body: ${JSON.stringify(req.body)}`);        // And this

        const donation = await Donation.findById(req.params.id);
        if (!donation) {
            console.log(`Donation not found with ID: ${req.params.id}`); // And this
            return res.status(404).json({ message: 'Donation not found' });
        }

        donation.status = status;

        if (status === 'accepted') {
            donation.acceptedBy = userId;
            donation.acceptanceNotes = notes;
            donation.acceptedAt = new Date();
        }

        if (status === 'picked') {
            donation.pickedUpBy = userId;
            donation.pickupNotes = notes;
            donation.pickedUpAt = new Date();
        }

        if (status === 'delivered') {
            donation.deliveredBy = userId;
            donation.deliveryNotes = notes;
            donation.deliveredAt = new Date();
        }

        await donation.save();
        res.status(200).json(donation);
    } catch (error) {
        console.error('Error updating donation status:', error);  // And this
        res.status(500).json({ message: 'Failed to update donation status', error: error.message });
    }
};

  export {
    createDonation,
    getAllDonations,
    getDonationById,
    updateDonation,
    deleteDonation,
    updateDonationStatus,
    getMyDonations
  };
  
  