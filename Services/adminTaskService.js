// adminService.js
const User = require('../model/Admin-Service');


class AdminService {
  static async getAllUsers() {
    try {
      return await User.getAllUsers();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async blockUser(userId) {
    try {
      await User.blockUser(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async unblockUser(userId) {
    try {
      await User.unblockUser(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteUser(userId) {
    try {
      await User.deleteUser(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getEventsByStatus(status) {
    try {
      return await User.getEventsByStatus(status);
    } catch (error) {
      throw new Error(error.message);
    }
  }


  static async approveEvent(eventId) {
    try {
      return await User.approveEvent(eventId);
    } catch (error) {
      throw new Error(error.message);
    }
  }


  static async rejectEvent(eventId) {
    try {
      return await User.rejectEvent(eventId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = AdminService;
