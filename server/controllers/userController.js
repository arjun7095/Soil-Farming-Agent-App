const Soil = require('../models/Soil');
const Distributor = require('../models/Distributor');

// Get soil details
exports.getSoilDetails = async (req, res) => {
  try {
    const soils = await Soil.find();
    res.json(soils);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get distributor details
exports.getDistributorDetails = async (req, res) => {
  try {
    const distributors = await Distributor.find();
    res.json(distributors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
