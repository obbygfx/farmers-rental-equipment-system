const express = require('express');
const router = express.Router();
const gpsController = require('../controllers/gps');
const { verifyToken } = require('../middleware/authJwt');

router.post('/log', verifyToken, gpsController.logGps);
router.get('/tractor/:tractor_id', verifyToken, gpsController.getTractorGps);
router.get('/booking/:booking_id', verifyToken, gpsController.getBookingGps);

module.exports = router;
