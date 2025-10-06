// controllers/userController.js
const testService = require('../services/testService');

class TestController {
  // GET /api/users
  getAllUsers = (req, res) => {
    try {
      const users = userService.getAllUsers();
      res.json({
        success: true,
        data: users,
        count: users.length,
        message: 'Users retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve users',
        message: error.message
      });
    }
  };

  // GET /api/users/:id
  getUserById = (req, res) => {
    try {
      const { id } = req.params;
      const user = userService.getUserById(id);
      res.json({
        success: true,
        data: user,
        message: 'User retrieved successfully'
      });
    } catch (error) {
      const statusCode = error.message.includes('not found') ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        error: 'Failed to retrieve user',
        message: error.message
      });
    }
  };

  // POST /api/users
  createUser = (req, res) => {
    try {
      const user = userService.createUser(req.body);
      res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully'
      });
    } catch (error) {
      const statusCode = error.message.includes('already exists') ? 409 : 400;
      res.status(statusCode).json({
        success: false,
        error: 'Failed to create user',
        message: error.message
      });
    }
  };

  // PUT /api/users/:id
  updateUser = (req, res) => {
    try {
      const { id } = req.params;
      const user = userService.updateUser(id, req.body);
      res.json({
        success: true,
        data: user,
        message: 'User updated successfully'
      });
    } catch (error) {
      const statusCode = error.message.includes('not found') ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        error: 'Failed to update user',
        message: error.message
      });
    }
  };

  // DELETE /api/users/:id
  deleteUser = (req, res) => {
    try {
      const { id } = req.params;
      const user = userService.deleteUser(id);
      res.json({
        success: true,
        data: user,
        message: 'User deleted successfully'
      });
    } catch (error) {
      const statusCode = error.message.includes('not found') ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        error: 'Failed to delete user',
        message: error.message
      });
    }
  };

  // GET /api/users/role/:role
  getUsersByRole = (req, res) => {
    try {
      const { role } = req.params;
      const users = userService.getUsersByRole(role);
      res.json({
        success: true,
        data: users,
        count: users.length,
        message: `Users with role '${role}' retrieved successfully`
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve users by role',
        message: error.message
      });
    }
  };

  // GET /api/users/search/:query
  searchUsers = (req, res) => {
    try {
      const { query } = req.params;
      const users = userService.searchUsers(query);
      res.json({
        success: true,
        data: users,
        count: users.length,
        message: `Search results for '${query}'`
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to search users',
        message: error.message
      });
    }
  };

  // GET /api/users/stats
  getUserStats = (req, res) => {
    try {
      const stats = userService.getUserStats();
      res.json({
        success: true,
        data: stats,
        message: 'User statistics retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve user statistics',
        message: error.message
      });
    }
  };
}

module.exports = new TestController();