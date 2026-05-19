const express = require('express');
const router = express.Router();
const tractorController = require('../controllers/tractors');
const { verifyToken, isOwner } = require('../middleware/authJwt');

router.post('/', [verifyToken, isOwner], tractorController.createTractor);
router.get('/', tractorController.getAllTractors);
router.get('/my', [verifyToken, isOwner], tractorController.getOwnerTractors);
router.put('/:id', [verifyToken, isOwner], tractorController.updateTractor);
router.delete('/:id', [verifyToken, isOwner], tractorController.deleteTractor);

module.exports = router;
