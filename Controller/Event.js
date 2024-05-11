// controllers/eventController.js
const eventService=require('../Services/eventService')
const Category=require('../model/Category')
const SuccessHandler = require('../SuccessResponse');


const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 } 
}).array('photos', 5); 

exports.uploadPhotos = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    next();
  });
};

exports.createEvent = async (req, res) => {
  try {
    let photos = [];
    if (req.files && req.files.length > 0) {
      photos = req.files.map(file => file.path); 
    }
    
    const { title, description, date, time, location, website, category_id } = req.body;
 
    // Validate category ID
    const isValidCategory = await Category.isValidCategoryId(category_id);
    if (!isValidCategory) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }
    
    const newEvent = await eventService.createEvent(title, description, date, time, location, website, category_id, photos);
    return SuccessHandler.sendSuccessResponse(res, 'Event created successfully', { Event: newEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// get approved events

exports.getApprovedEvents = async (req, res) => {
  try {
    const approvedEvents = await eventService.getApprovedEvents();
    return SuccessHandler.sendSuccessResponse(res, ' approved events fetched successfully',{Events:approvedEvents});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// delete event

exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    await eventService.deleteEvent(eventId);
    return SuccessHandler.sendSuccessResponse(res, 'Event deleted successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};