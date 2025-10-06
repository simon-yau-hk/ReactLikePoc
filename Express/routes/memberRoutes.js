// routes/memberRoutes.js
const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

// ========================================
// GET ROUTES (Read Operations)
// ========================================

// GET /api/members - Get all members
/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Get all members
 *     description: Retrieve a list of all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: List of members retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', memberController.getAllMembers);

// GET /api/members/tasks - Get all members with tasks
router.get('/tasks', memberController.getAllMembersWithTasks);

// GET /api/members/tasks/v2 - Get all members with tasks V2
router.get('/tasks/v2', memberController.getAllMembersWithTasksV2);

// GET /api/members/stats - Get member statistics
router.get('/stats', memberController.getMemberStats);

// GET /api/members/active - Get active members only
router.get('/active', memberController.getActiveMembers);

// GET /api/members/export - Export members data
router.get('/export', memberController.exportMembers);

// GET /api/members/search/:query - Search members
router.get('/search/:query', memberController.searchMembers);

// GET /api/members/username/:username - Get member by username
router.get('/username/:username', memberController.getMemberByUsername);

// GET /api/members/email/:email - Get member by email
router.get('/email/:email', memberController.getMemberByEmail);

// GET /api/members/:id - Get member by ID
router.get('/:id', memberController.getMemberById);

// GET /api/members/:id/tasks - Get member with their tasks
router.get('/:id/tasks', memberController.getMemberWithTasks);

// GET /api/members/:id/profile - Get member profile
router.get('/:id/profile', memberController.getMemberProfile);

// ========================================
// POST ROUTES (Create Operations)
// ========================================

// POST /api/members - Create new member
router.post('/', memberController.createMember);

// POST /api/members/:id/activate - Activate member
router.post('/:id/activate', memberController.activateMember);

// POST /api/members/:id/deactivate - Deactivate member
router.post('/:id/deactivate', memberController.deactivateMember);

// ========================================
// PUT/PATCH ROUTES (Update Operations)
// ========================================

// PUT /api/members/:id - Update member (full update)
router.put('/:id', memberController.updateMember);

// PATCH /api/members/:id/status - Update member status only
router.patch('/:id/status', memberController.updateMemberStatus);

// ========================================
// DELETE ROUTES (Delete Operations)
// ========================================

// DELETE /api/members/:id - Delete member
router.delete('/:id', memberController.deleteMember);

// ========================================
// ROUTE ORDERING NOTES
// ========================================
/*
IMPORTANT: Route order matters in Express!

Static routes (like /stats, /active, /export) must come BEFORE 
parameterized routes (like /:id) to avoid conflicts.

Correct order:
1. /stats
2. /active  
3. /export
4. /search/:query
5. /username/:username
6. /email/:email
7. /:id
8. /:id/tasks
9. /:id/profile

This ensures that /stats is matched before /:id would catch it.
*/

// ========================================
// ROUTE DOCUMENTATION
// ========================================

/*
API ENDPOINTS DOCUMENTATION:

GET /api/members
- Description: Get all members
- Parameters: None
- Response: Array of all members

GET /api/members/stats
- Description: Get member statistics
- Parameters: None
- Response: Statistics object

GET /api/members/active
- Description: Get only active members
- Parameters: None
- Response: Array of active members

GET /api/members/export
- Description: Export members data
- Parameters: None
- Response: Formatted export data

GET /api/members/search/:query
- Description: Search members by query
- Parameters: query (string)
- Response: Array of matching members

GET /api/members/username/:username
- Description: Get member by username
- Parameters: username (string)
- Response: Member object

GET /api/members/email/:email
- Description: Get member by email
- Parameters: email (string)
- Response: Member object

GET /api/members/:id
- Description: Get member by ID
- Parameters: id (number)
- Response: Member object

GET /api/members/:id/tasks
- Description: Get member with their tasks
- Parameters: id (number)
- Response: Member object with tasks array

GET /api/members/:id/profile
- Description: Get member profile
- Parameters: id (number)
- Response: Member profile object

POST /api/members
- Description: Create new member
- Body: { username, email, first_name, last_name, password_hash, is_active }
- Response: Created member object

POST /api/members/:id/activate
- Description: Activate member
- Parameters: id (number)
- Response: Updated member object

POST /api/members/:id/deactivate
- Description: Deactivate member
- Parameters: id (number)
- Response: Updated member object

PUT /api/members/:id
- Description: Update member (full update)
- Parameters: id (number)
- Body: { username, email, first_name, last_name, is_active }
- Response: Updated member object

PATCH /api/members/:id/status
- Description: Update member status only
- Parameters: id (number)
- Body: { is_active: boolean }
- Response: Updated member object

DELETE /api/members/:id
- Description: Delete member
- Parameters: id (number)
- Response: Deleted member object
*/

module.exports = router;