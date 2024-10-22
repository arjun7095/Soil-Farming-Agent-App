const express = require('express');
const { getSoilDetails, getDistributorDetails } = require('../controllers/userController');

const router = express.Router();

router.get('/soils', getSoilDetails);
router.get('/distributors', getDistributorDetails);


module.exports = router;
