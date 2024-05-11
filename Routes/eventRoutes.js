const express = require('express');
const router = express.Router();
const eventController = require('../Controller/Event');
const authenticateToken=require('../middleware/userAuthMiddleware')

// route to create event
router.post('/create/events',authenticateToken, eventController.uploadPhotos, eventController.createEvent);

// Route to delete a specific event by ID
router.delete('/delete/events/:id',authenticateToken,eventController.deleteEvent);

// Route to fetch a approved event 
router.get('/approved/events/',authenticateToken,eventController.getApprovedEvents);


module.exports = router;
