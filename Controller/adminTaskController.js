// adminController.js
const AdminService = require('../Services/adminTaskService');
const SuccessHandler = require('../SuccessResponse');


// get all users

exports.getAllUsers = async (req, res) => {
  try {
    const users = await AdminService.getAllUsers();
    return SuccessHandler.sendSuccessResponse(res, 'Users fetched successfully', { users:users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// block user

exports.blockUser = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  try {
    await AdminService.blockUser(id);
    return SuccessHandler.sendSuccessResponse(res, 'User blocked successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// unblock user

exports.unblockUser = async (req, res) => {
  const id = req.params.id;
  try {
    await AdminService.unblockUser(id);
    return SuccessHandler.sendSuccessResponse(res, 'User Unblocked successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// delete user

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await AdminService.deleteUser(id);
    return SuccessHandler.sendSuccessResponse(res, 'User deleted successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// get event by status

exports.getEventsByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const events = await AdminService.getEventsByStatus(status);
    return SuccessHandler.sendSuccessResponse(res, 'event fetched successfully',{events:events});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// approve event

exports.approveEvent = async (req, res) => {
  const eventId = req.params.eventId;
  try {
    await AdminService.approveEvent(eventId);
    return SuccessHandler.sendSuccessResponse(res, 'Event approved successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// reject event

exports.rejectEvent = async (req, res) => {
  const eventId = req.params.eventId;
  try {
    await AdminService.rejectEvent(eventId);
    return SuccessHandler.sendSuccessResponse(res, 'Event rejected successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
