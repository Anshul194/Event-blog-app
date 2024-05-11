
const express = require('express');
const router = express.Router();
const adminController = require('../Controller/adminTaskController');
const authenticateToken=require('../middleware/adminAuthMiddleware')

// Route to get all users
router.get('/users',authenticateToken, adminController.getAllUsers);

// Route to block a user
router.patch('/block/user/:id',authenticateToken,adminController.blockUser);

// Route to unblock a user
router.patch('/unblock/user/:id',authenticateToken,adminController.unblockUser);

// Route to delete a user
router.delete('/delete/user/:id',authenticateToken,adminController.deleteUser);

// Route to get events by status
router.get('/events/:status',authenticateToken,adminController.getEventsByStatus);

// Route to approve events by Id
router.patch('/approve/event/:eventId',authenticateToken,adminController.approveEvent);

// Route to reject events by Id
router.patch('/reject/event/:eventId',authenticateToken,adminController.rejectEvent);

module.exports = router;
