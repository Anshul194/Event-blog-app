const mysql = require('mysql2/promise');

async function main() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'October@14',
      database: 'blogappdb'
    });

    console.log('Connected to MySQL database');

    // Array of queries to create tables
    const createTableQueries = [

      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        isBlocked BOOLEAN DEFAULT false
      )`,
  
  
      `CREATE TABLE IF NOT EXISTS admin (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL
        )`,
  
  
        `CREATE TABLE IF NOT EXISTS category (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL
      );`,
      
      `CREATE TABLE IF NOT EXISTS events (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          date DATE NOT NULL,
          time TIME NOT NULL,
          location VARCHAR(255) NOT NULL,
          website VARCHAR(255),
          category_id INT,
          photos JSON,
          status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (category_id) REFERENCES category(id)
      );`,
  
      `CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author TEXT NOT NULL,
        category_id INT,
        FOREIGN KEY (category_id) REFERENCES category(id),
        tags JSON,
        status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    ];

    // Execute each query in the array
    for (const query of createTableQueries) {
      await connection.execute(query);       console.log('Table created');
    }

    return connection;

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}
module.exports = main;
main();