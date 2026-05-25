const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookings');
const { verifyToken, isOwner } = require('../middleware/authJwt');

router.post('/', verifyToken, bookingController.createBooking);
router.get('/farmer', verifyToken, bookingController.getFarmerBookings);
router.get('/owner', [verifyToken, isOwner], bookingController.getOwnerBookings);
router.put('/:id', verifyToken, bookingController.updateBookingStatus);

module.exports = router;
