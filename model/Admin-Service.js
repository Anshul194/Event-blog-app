// userModel.js
const db = require('../config/dbConfig');

class AdminTask {
  static async getAllUsers() {
    try {
      const connection = await db();
      const [rows] = await connection.execute('SELECT * FROM users');
      return rows;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async blockUser(userId) {
    try {
      const connection = await db();
      await connection.execute('UPDATE users SET  isBlocked= 1 WHERE id = ?', [userId]);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async unblockUser(userId) {
    try {
      const connection = await db();
      await connection.execute('UPDATE users SET isBlocked = 0 WHERE id = ?', [userId]);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteUser(userId) {
    try {
      const connection = await db();
      await connection.execute('DELETE FROM users WHERE id = ?', [userId]);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getEventsByStatus(status) {
    try {
      const connection = await db();
      const [rows] = await connection.execute('SELECT * FROM events WHERE status = ?', [status]);
      return rows;
    } catch (error) {
      throw new Error(error.message);
    }
  }


static async approveEvent(eventId) {
  try {
    const connection = await db();
    await connection.execute('UPDATE events SET status = "approved" WHERE id = ?', [eventId]);
  } catch (error) {
    throw new Error(error.message);
  }
}

static async rejectEvent(eventId) {
  try {
    const connection = await db();
    await connection.execute('UPDATE events SET status = "approved" WHERE id = ?', [eventId]);
  } catch (error) {
    throw new Error(error.message);
  }
}

}

module.exports = AdminTask;
