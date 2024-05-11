const main = require('../config/dbConfig');

class Admin {
  static async createAdmin(username, email, password) {
    try {
     
      const connection = await main();
      const [existingAdmin] = await connection.execute('SELECT * FROM admin WHERE email = ?', [email]);
      if (existingAdmin.length > 0) {
        throw new Error('Email already exists');
      }

      const query = 'INSERT INTO admin (username, email, password) VALUES (?, ?, ?)';
      const [result] = await connection.execute(query, [username, email, password]);

      const [insertedAdmin] = await connection.execute('SELECT * FROM admin WHERE id = ?', [result.insertId]);
      
      await connection.end();

      return insertedAdmin[0];
    } catch (err) {
      throw err;
    }
  }


  static async getAdminByEmail(email) {
    try {
      const connection = await main();

      const [admin] = await connection.execute('SELECT * FROM admin WHERE email = ?', [email]);
      return admin[0];
    } catch (err) {
      throw err;
    }
  }

  static async findById(id){
    try {
      const connection = await main();
  
      const [user] = await connection.execute('SELECT * FROM admin WHERE id = ?', [id]);
      return user[0];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Admin;
