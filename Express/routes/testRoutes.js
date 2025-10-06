// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

// GET /api/users
router.get('/', testController.getAllUsers);

// GET /api/users/:id
router.get('/:id', testController.getUserById);

// POST /api/users
router.post('/', testController.createUser);

// PUT /api/users/:id
router.put('/:id', testController.updateUser);

// DELETE /api/users/:id
router.delete('/:id', testController.deleteUser);

module.exports = router;