
const express = require('express');
const router = express.Router();
const blogController = require('../Controller/blogController');
const authenticateToken=require('../middleware/userAuthMiddleware')


// Route to create a blog
router.post('/create/blog',authenticateToken,blogController.createBlog);

// Route to update a blog
router.put('/update/blog/:id',authenticateToken, blogController.updateBlog);

// Delete a blog by ID
router.delete('/delete/blog/:id',authenticateToken, blogController.deleteBlog);

// Route to get a blog
router.get('/blogs',authenticateToken, blogController.getAllBlog);


module.exports = router;
