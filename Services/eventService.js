// services/eventService.js
const db = require('../config/dbConfig');

class EventService {
  static async createEvent( title, description, date, time, location, website, category_id,photos) {
   

    try {
      const connection = await db();

      const [result] = await connection.execute(
        'INSERT INTO events (title, description, date, time, location, website, category_id, photos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [title, description, date, time, location, website, category_id, JSON.stringify(photos)]
      );
      const [newEvent] = await connection.execute('SELECT * FROM events WHERE id = ?', [result.insertId]);

      return newEvent[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }




  static async  getApprovedEvents(){
    try {
      const connection = await db(); 
              const [rows, fields] = await connection.execute('SELECT * FROM events WHERE status = ?', ['approved']);
  
      await connection.end();
        return rows;
    } catch (error) {
      throw new Error(error.message);
    }
  };


  static async deleteEvent(eventId) {
    try {
      const connection = await db();
      await connection.execute('DELETE FROM events WHERE id = ?', [eventId]);

      return { message: 'Event deleted successfully' };
    } catch (error) {
      throw new Error(error.message);
    }
  }






}



module.exports = EventService;
