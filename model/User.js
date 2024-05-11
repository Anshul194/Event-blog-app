const main = require('../config/dbConfig');

class User {
  static async createUser(username, email, password) {
    try {
     
      const connection = await main();
      const [existingUsers] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUsers.length > 0) {
        throw new Error('Email already exists');
      }

      const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      const [result] = await connection.execute(query, [username, email, password]);
      
      const [insertedUser] = await connection.execute('SELECT * FROM users WHERE id = ?', [result.insertId]);
      
      await connection.end();

      return insertedUser[0];
    } catch (err) {
      throw err;
    }
  }


  static async getUserByEmail(email) {
    try {
      const connection = await main();

      const [user] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
      return user[0];
    } catch (err) {
      throw err;
    }
  }


static async findById(id){
  try {
    const connection = await main();

    const [user] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
    return user[0];
  } catch (err) {
    throw err;
  }
}


static async getUserStatus(id) {
  try {
    const connection = await db();
    const [user] = await connection.execute('SELECT status FROM users WHERE id = ?', [id]);
    return user[0] ? user[0].status : null;
  } catch (error) {
    throw new Error(error.message);
  }
}

}
module.exports = User;
