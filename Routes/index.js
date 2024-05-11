const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes')
const eventRoutes = require('./eventRoutes')
const  adminTaskRoutes= require('./adminServiceRoutes')
const blogRoutes=require('./blogRoutes')
const filter=require('./filterRoutes')

router.use('/user', userRoutes);
router.use('/admin',adminRoutes);
router.use('/',eventRoutes)
router.use('/',adminTaskRoutes)
router.use('/filter',filter)

router.use('/',blogRoutes)

module.exports = router;
