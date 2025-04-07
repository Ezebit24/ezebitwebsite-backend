const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users/careers-upload', userController.Jobapply);
router.post('/users/contact-us', userController.contactUs);
router.post('/users/subscribe', userController.subscribe);

module.exports = router;