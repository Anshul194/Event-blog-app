// blogModel.js
const db = require('../config/dbConfig');

class Blog {
  static async createBlog({ title, content, author, category_id, tags }) 
  {
    try {
      const connection = await db();
      const [result] = await connection.execute(
        'INSERT INTO blogs (title, content, author, category_id, tags) VALUES (?, ?, ?, ?, ?)',
        [title, content, author, category_id, JSON.stringify(tags)]
      );
      const [newBlog] = await connection.execute('SELECT * FROM blogs WHERE id = ?', [result.insertId]);
      return newBlog[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }


static async updateBlog(blogId, { title, content, author, category_id, tags }) {
  try {
      const connection = await db();
      await connection.execute(
          'UPDATE blogs SET title=?, content=?, author=?, category_id=?, tags=? WHERE id=?',
          [title, content, author, category_id, JSON.stringify(tags), blogId]
      );
  } catch (error) {
      throw new Error(error.message);
  }
}

static async deleteBlog(blogId) {
  try {
      const connection = await db();
      await connection.execute('DELETE FROM blogs WHERE id = ?', [blogId]);
  } catch (error) {
      throw new Error(error.message);
  }
}


static async getAllBlogs() {
  try {
    const connection = await db();
    const [blogs] = await connection.execute('SELECT * FROM blogs');
    return blogs;
  } catch (error) {
    throw new Error(error.message);
  }
}

}
module.exports = Blog;
