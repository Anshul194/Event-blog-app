// models/Category.js
const db = require('../config/dbConfig');

class Category {
  static async isValidCategoryId(categoryId) {
    try {
      const connection = await db();
      const [result] = await connection.execute('SELECT COUNT(*) AS count FROM category WHERE id = ?', [categoryId]);
      const { count } = result[0];
      return count > 0;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = Category;
