const mongoose = require('mongoose');

const SoilSchema = new mongoose.Schema({
  type: { type: String, required: true },
  characteristics: { type: String, required: true },
  suitableCrops: { type: [String], required: true },
});

module.exports = mongoose.model('Soil', SoilSchema);
