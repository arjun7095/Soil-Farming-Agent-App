const mongoose = require('mongoose');

const DistributorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  cropsDistributed: { type: [String], required: true },
});

module.exports = mongoose.model('Distributor', DistributorSchema);
