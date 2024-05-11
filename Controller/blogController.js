const Blog = require('../model/Blog');
const SuccessHandler = require('../SuccessResponse');
const Category=require('../model/Category')

// create blog

exports.createBlog = async (req, res) => {
    const { title, content, author, category_id, tags } = req.body;
    try {
      const isValidCategory = await Category.isValidCategoryId(category_id);
      if (!isValidCategory) {
        return res.status(400).json({ error: 'Invalid category ID' });
      }

      const newBlog = await Blog.createBlog({ 
        title, 
        content, 
        author, 
        category_id, 
        tags: JSON.stringify(tags) 
      });
      return SuccessHandler.sendSuccessResponse(res, 'Blog Created successfully',{Blog:newBlog});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // delete blog

  exports.deleteBlog = async (req, res) => {
    const blogId = req.params.id;
    try {
        await Blog.deleteBlog(blogId);
        return SuccessHandler.sendSuccessResponse(res, 'Blog Deleted successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// update blog

exports.updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const { title, content, author, category_id, tags } = req.body;
  try {
      await Blog.updateBlog(blogId, { title, content, author, category_id, tags });
      return SuccessHandler.sendSuccessResponse(res, 'Blog Updated successfully');
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// get all blogs

exports.getAllBlog = async (req, res) => {
  try {
    const blogs=  await Blog.getAllBlogs();
      return SuccessHandler.sendSuccessResponse(res, 'Blog fetched successfully',{blog:blogs});
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};