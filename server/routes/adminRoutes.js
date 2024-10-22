const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Distributor = require('../models/Distributor');
const Soil = require('../models/Soil');

// POST route for adding soil details
router.post('/soil', authMiddleware, async (req, res) => {
  const { type, characteristics, suitableCrops } = req.body;

  // Create and save new soil details in the database
  const newSoil = new Soil({ type, characteristics, suitableCrops });

  try {
    await newSoil.save();
    res.status(201).json(newSoil);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add soil details' });
  }
});

// POST route for adding distributor details
router.post('/distributor', authMiddleware, async (req, res) => {
  const { name, location, contact, cropsDistributed } = req.body;

  const newDistributor = new Distributor({ name, location, contact, cropsDistributed });

  try {
    await newDistributor.save();
    res.status(201).json(newDistributor);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add distributor details' });
  }
});

module.exports = router;
