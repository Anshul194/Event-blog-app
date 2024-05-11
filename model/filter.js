
const db = require('../config/dbConfig');

class filter {
 
  static async filterEvents({ date, time, latitude, longitude, category }) {
    console.log(latitude)
    try {
      const connection = await db();
      let query = 'SELECT * FROM events WHERE 1';
      const params = [];
  
      if (date) {
        query += ' AND date = ?';
        params.push(date);
      }
      if (time) {
        query += ' AND time = ?';
        params.push(time);
      }
      if (latitude && longitude) {
       
        query += ' AND ST_Distance_Sphere(point(SUBSTRING_INDEX(location, ",", 1), SUBSTRING_INDEX(location, ",", -1)), point(?, ?)) < 10000'; // 10 kilometers
        console.log(query)
        params.push(latitude, longitude); 
      }
      if (category) {
        query += ' AND category_id = ?';
        params.push(category);
      }
  
      const [events] = await connection.execute(query, params);
      return events;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  


  static async filterBlogs({ category, tags }) {
    try {
      const connection = await db();
      let query = 'SELECT * FROM blogs WHERE 1';
      const params = [];
  
      if (category) {
        query += ' AND category_id = ?';
        params.push(category);
      }
  
      if (tags) {
        let tagsArray;
        try {
          tagsArray = JSON.parse(tags);
        } catch (error) {
          tagsArray = [tags];
        }
  
        if (Array.isArray(tagsArray) && tagsArray.length > 0) {
          if (tagsArray.length === 1) {
            query += ' AND JSON_CONTAINS(tags, JSON_QUOTE(?))';
            params.push(tagsArray[0]);
          } else {
            query += ' AND (';
            for (let i = 0; i < tagsArray.length; i++) {
              query += 'JSON_CONTAINS(tags, JSON_QUOTE(?))';
              params.push(tagsArray[i]);
              if (i !== tagsArray.length - 1) query += ' OR ';
            }
            query += ')';
          }
        }
      }
  
      const [blogs] = await connection.execute(query, params);
      return blogs;
    } catch (error) {
      throw new Error(error.message);
    }
  }





}

module.exports = filter;
