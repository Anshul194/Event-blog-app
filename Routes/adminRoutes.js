const express = require('express');
const router = express.Router();
const adminController = require('../Controller/adminController');


router.post('/signup', adminController.signupAdmin);

router.post('/signin',adminController.signinAdmin);

module.exports = router;
