const Soil = require('../models/Soil');
const Distributor = require('../models/Distributor');

// Post soil details
exports.postSoilDetails = async (req, res) => {
  const { type, characteristics, suitableCrops } = req.body;
  try {
    const soil = new Soil({ type, characteristics, suitableCrops });
    await soil.save();
    res.status(201).json({ message: 'Soil details posted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Post distributor details
exports.postDistributorDetails = async (req, res) => {
  const { name, location, contact, cropsDistributed } = req.body;
  console.log({name})
  try {
    const distributor = new Distributor({ name, location, contact, cropsDistributed });
    await distributor.save();
    res.status(201).json({ message: 'Distributor details posted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
