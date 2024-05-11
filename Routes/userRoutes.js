const express = require('express');
const router = express.Router();
const errorHandler=require('../middleware/errorHandler')
const userController = require('../Controller/User');


router.post('/signup', userController.signup);

router.post('/signin', userController.signin);

router.use(errorHandler); 
module.exports = router;
