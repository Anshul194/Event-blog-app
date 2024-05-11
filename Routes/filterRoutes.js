
const express = require('express');
const router = express.Router();
const filter = require('../Controller/filter');

// Route to filter events
router.get('/events', filter.filterEvents);

// Route to filter blogs
router.get('/blogs', filter.filterBlogs);


module.exports = router;
