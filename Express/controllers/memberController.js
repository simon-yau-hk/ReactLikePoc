// controllers/memberController.js
const memberService = require('../services/memberService');

class MemberController {
  // GET /api/members
  getAllMembers = async (req, res) => {
    try {
      const result = await memberService.getAllMembers();
      res.json(result);
    } catch (error) {
      console.error('Error in getAllMembers:', error.message);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve members',
        message: error.message
      });
    }
  };

  getAllMembersWithTasks = async (req, res) => {
    try {
      const result = await memberService.getAllMembersWithTasks();
      res.json(result);
    } catch (error) {
      console.error('Error in getAllMembersWithTasks:', error.message);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve members with tasks',
        message: error.message
      });
    }
  };
  
  getAllMembersWithTasksV2 = async (req, res) => {
    try {
      const result = await memberService.getAllMembersWithTasksV2();
      res.json(result);
    } catch (error) {
      console.error('Error in getAllMembersWithTasksV2:', error.message);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve members with tasks V2',
        message: error.message
      });
    }
  };


  // GET /api/members/:id
  getMemberById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await memberService.getMemberById(id);
      res.json(result);
    } catch (error) {
      console.error('Error in getMemberById:', error.message);
      const statusCode = error.message.includes('not found') ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        error: 'Failed to retrieve member',
        message: error.message
      });
    }
  };

  // GET /api/members/username/:username
  getMemberByUsername = async (req, res) => {
    try {
      const { username } = req.params;
      const result = await memberService.getMemberByUsername(username);
      res.json(result);
    } catch (error) {
      console.error('Error in getMemberByUsername:', error.message);
      const statusCode = error.message.includes('not found') ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        error: 'Failed to retrieve member',
        message: error.message
      });
    }
  };

  // GET /api/members/email/:email
  getMemberByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const result = await memberService.getMemberByEmail(email);
      res.json(result);
    } catch (error) {
      console.error('Error in getMemberByEmail:', error.message);
      const statusCode = error.message.includes('not found') ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        error: 'Failed to retrieve member',
        message: error.message
      });
    }
  };

  // POST /api/members
  createMember = async (req, res) => {
    try {
      const result = await memberService.createMember(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error in createMember:', error.message);
      const statusCode = error.message.includes('already exists') ? 409 : 400;
      res.status(statusCode).json({
        success: false,
        error: 'Failed to create member',
        message: error.message
      });
    }
  };

  // PUT /api/members/:id
  updateMember = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await memberService.updateMember(id, req.body);
      res.json(result);
    } catch (error) {
      console.error('Error in updateMember:', error.message);
      const statusCode = error.message.includes('not found') ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        error: 'Failed to update member',
        message: error.message
      });
    }
  };

  // DELETE /api/members/:id
  deleteMember = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await memberService.deleteMember(id);
      res.json(result);
    } catch (error) {
      console.error('Error in deleteMember:', error.message);
      const statusCode = error.message.includes('not found') ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        error: 'Failed to delete member',
        message: error.message
      });
    }
  };

  // GET /api/members/active
  getActiveMembers = async (req, res) => {
    try {
      const result = await memberService.getActiveMembers();
      res.json(result);
    } catch (error) {
      console.error('Error in getActiveMembers:', error.message);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve active members',
        message: error.message
      });
    }
  };

  // GET /api/members/search/:query
  searchMembers = async (req, res) => {
    try {
      const { query } = req.params;
      const result = await memberService.searchMembers(query);
      res.json(result);
    } catch (error) {
      console.error('Error in searchMembers:', error.message);
      res.status(500).json({
        success: false,
        error: 'Failed to search members',
        message: error.message
      });
    }
  };

  // GET /api/members/stats
  getMemberStats = async (req, res) => {
    try {
      const result = await memberService.getMemberStats();
      res.json(result);
    } catch (error) {
      console.error('Error in getMemberStats:', error.message);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve member statistics',
        message: error.message
      });
    }
  };

  // POST /api/members/:id/activate
  activateMember = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await memberService.activateMember(id);
      res.json(result);
    } catch (error) {
      console.error('Error in activateMember:', error.message);
      const statusCode = error.message.includes('not found') ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        error: 'Failed to activate member',
        message: error.message
      });
    }
  };

  // POST /api/members/:id/deactivate
  deactivateMember = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await memberService.deactivateMember(id);
      res.json(result);
    } catch (error) {
      console.error('Error in deactivateMember:', error.message);
      const statusCode = error.message.includes('not found') ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        error: 'Failed to deactivate member',
        message: error.message
      });
    }
  };

  // GET /api/members/:id/tasks
  getMemberWithTasks = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await memberService.getMemberWithTasks(id);
      res.json(result);
    } catch (error) {
      console.error('Error in getMemberWithTasks:', error.message);
      const statusCode = error.message.includes('not found') ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        error: 'Failed to retrieve member with tasks',
        message: error.message
      });
    }
  };

  // GET /api/members/:id/profile
  getMemberProfile = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await memberService.getMemberById(id);
      
      // Add additional profile information
      const profile = {
        ...result.data,
        profile_complete: !!(result.data.first_name && result.data.last_name && result.data.email),
        member_since: result.data.created_at,
        last_updated: result.data.updated_at
      };

      res.json({
        success: true,
        data: profile,
        message: 'Member profile retrieved successfully'
      });
    } catch (error) {
      console.error('Error in getMemberProfile:', error.message);
      const statusCode = error.message.includes('not found') ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        error: 'Failed to retrieve member profile',
        message: error.message
      });
    }
  };

  // PATCH /api/members/:id/status
  updateMemberStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { is_active } = req.body;

      if (typeof is_active !== 'boolean') {
        return res.status(400).json({
          success: false,
          error: 'Invalid status value',
          message: 'is_active must be a boolean value'
        });
      }

      const result = is_active 
        ? await memberService.activateMember(id)
        : await memberService.deactivateMember(id);

      res.json(result);
    } catch (error) {
      console.error('Error in updateMemberStatus:', error.message);
      const statusCode = error.message.includes('not found') ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        error: 'Failed to update member status',
        message: error.message
      });
    }
  };

  // GET /api/members/export
  exportMembers = async (req, res) => {
    try {
      const result = await memberService.getAllMembers();
      
      // Format data for export
      const exportData = result.data.map(member => ({
        id: member.id,
        username: member.username,
        email: member.email,
        first_name: member.first_name,
        last_name: member.last_name,
        is_active: member.is_active,
        created_at: member.created_at,
        updated_at: member.updated_at
      }));

      res.json({
        success: true,
        data: exportData,
        count: exportData.length,
        exported_at: new Date().toISOString(),
        message: 'Members exported successfully'
      });
    } catch (error) {
      console.error('Error in exportMembers:', error.message);
      res.status(500).json({
        success: false,
        error: 'Failed to export members',
        message: error.message
      });
    }
  };
}

module.exports = new MemberController();