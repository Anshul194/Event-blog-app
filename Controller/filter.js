const filter = require('../model/filter');
const SuccessHandler = require('../SuccessResponse');


// filer event

exports.filterEvents = async (req, res) => {
  const { date, time, latitude,longitude,category } = req.query;
  try {
    const filteredEvents = await filter.filterEvents({ date, time,  latitude,longitude, category });
    return SuccessHandler.sendSuccessResponse(res, 'filtered successfully',{Events:filteredEvents});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// filter blog

exports.filterBlogs = async (req, res) => {
    const { category, tags } = req.query;
    try {
      const filteredBlogs = await filter.filterBlogs({ category, tags });
      return SuccessHandler.sendSuccessResponse(res, 'filtered successfully',{Blogs:filteredBlogs});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
