// services/memberService.js
const memberRepository = require('../repositories/memberRepository');

class MemberService {
  // Get all members
  async getAllMembers() {
    try {
      const members = await memberRepository.findAll();
      return {
        success: true,
        data: members,
        count: members.length,
        message: 'Members retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to retrieve members: ${error.message}`);
    }
  }
  
  async getAllMembersWithTasks() {
    try {
      const members = await memberRepository.findAllWithTasks();
      return {
        success: true,
        data: members,
        count: members.length,
        message: 'Members retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to retrieve members with tasks: ${error.message}`);
    }
  }

  async getAllMembersWithTasksV2() {
    try {
      const members = await memberRepository.findAllWithTasksV2();
      return {
        success: true,
        data: members,
        count: members.length,
        message: 'Members retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to retrieve members with tasks V2: ${error.message}`);
    }
  }

  // Get member by ID
  async getMemberById(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error('Invalid member ID');
      }

      const member = await memberRepository.findById(id);
      if (!member) {
        throw new Error(`Member with ID ${id} not found`);
      }

      return {
        success: true,
        data: member,
        message: 'Member retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to retrieve member: ${error.message}`);
    }
  }

  // Get member by username
  async getMemberByUsername(username) {
    try {
      if (!username || username.trim() === '') {
        throw new Error('Username is required');
      }

      const member = await memberRepository.findByUsername(username);
      if (!member) {
        throw new Error(`Member with username '${username}' not found`);
      }

      return {
        success: true,
        data: member,
        message: 'Member retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to retrieve member: ${error.message}`);
    }
  }

  // Get member by email
  async getMemberByEmail(email) {
    try {
      if (!email || email.trim() === '') {
        throw new Error('Email is required');
      }

      const member = await memberRepository.findByEmail(email);
      if (!member) {
        throw new Error(`Member with email '${email}' not found`);
      }

      return {
        success: true,
        data: member,
        message: 'Member retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to retrieve member: ${error.message}`);
    }
  }

  // Create new member
  async createMember(memberData) {
    try {
      const { username, email, first_name, last_name, password_hash, is_active = true } = memberData;

      // Validation
      if (!username || username.trim() === '') {
        throw new Error('Username is required');
      }

      if (!email || email.trim() === '') {
        throw new Error('Email is required');
      }

      if (!first_name || first_name.trim() === '') {
        throw new Error('First name is required');
      }

      if (!last_name || last_name.trim() === '') {
        throw new Error('Last name is required');
      }

      if (!password_hash || password_hash.trim() === '') {
        throw new Error('Password hash is required');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }

      // Username validation
      if (username.length < 3) {
        throw new Error('Username must be at least 3 characters long');
      }

      // Check if username already exists
      const existingUsername = await memberRepository.findByUsername(username);
      if (existingUsername) {
        throw new Error('Username already exists');
      }

      // Check if email already exists
      const existingEmail = await memberRepository.findByEmail(email);
      if (existingEmail) {
        throw new Error('Email already exists');
      }

      // Create member
      const newMember = await memberRepository.create({
        username,
        email,
        first_name,
        last_name,
        password_hash,
        is_active
      });

      return {
        success: true,
        data: newMember,
        message: 'Member created successfully'
      };
    } catch (error) {
      throw new Error(`Failed to create member: ${error.message}`);
    }
  }

  // Update member
  async updateMember(id, memberData) {
    try {
      if (!id || isNaN(id)) {
        throw new Error('Invalid member ID');
      }

      const { username, email, first_name, last_name, is_active } = memberData;

      // Check if member exists
      const existingMember = await memberRepository.findById(id);
      if (!existingMember) {
        throw new Error(`Member with ID ${id} not found`);
      }

      // Validation for provided fields
      if (username !== undefined) {
        if (!username || username.trim() === '') {
          throw new Error('Username cannot be empty');
        }
        if (username.length < 3) {
          throw new Error('Username must be at least 3 characters long');
        }
        // Check if username already exists (excluding current member)
        const existingUsername = await memberRepository.findByUsername(username);
        if (existingUsername && existingUsername.id !== parseInt(id)) {
          throw new Error('Username already exists');
        }
      }

      if (email !== undefined) {
        if (!email || email.trim() === '') {
          throw new Error('Email cannot be empty');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new Error('Invalid email format');
        }
        // Check if email already exists (excluding current member)
        const existingEmail = await memberRepository.findByEmail(email);
        if (existingEmail && existingEmail.id !== parseInt(id)) {
          throw new Error('Email already exists');
        }
      }

      if (first_name !== undefined && (!first_name || first_name.trim() === '')) {
        throw new Error('First name cannot be empty');
      }

      if (last_name !== undefined && (!last_name || last_name.trim() === '')) {
        throw new Error('Last name cannot be empty');
      }

      // Update member
      const updatedMember = await memberRepository.update(id, {
        username: username || existingMember.username,
        email: email || existingMember.email,
        first_name: first_name || existingMember.first_name,
        last_name: last_name || existingMember.last_name,
        is_active: is_active !== undefined ? is_active : existingMember.is_active
      });

      return {
        success: true,
        data: updatedMember,
        message: 'Member updated successfully'
      };
    } catch (error) {
      throw new Error(`Failed to update member: ${error.message}`);
    }
  }

  // Delete member
  async deleteMember(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error('Invalid member ID');
      }

      // Check if member exists
      const existingMember = await memberRepository.findById(id);
      if (!existingMember) {
        throw new Error(`Member with ID ${id} not found`);
      }

      // Delete member
      const deleted = await memberRepository.delete(id);
      if (!deleted) {
        throw new Error('Failed to delete member');
      }

      return {
        success: true,
        data: existingMember,
        message: 'Member deleted successfully'
      };
    } catch (error) {
      throw new Error(`Failed to delete member: ${error.message}`);
    }
  }

  // Get active members
  async getActiveMembers() {
    try {
      const members = await memberRepository.findActive();
      return {
        success: true,
        data: members,
        count: members.length,
        message: 'Active members retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to retrieve active members: ${error.message}`);
    }
  }

  // Search members
  async searchMembers(query) {
    try {
      if (!query || query.trim() === '') {
        throw new Error('Search query is required');
      }

      const members = await memberRepository.search(query);
      return {
        success: true,
        data: members,
        count: members.length,
        query: query,
        message: `Search results for '${query}'`
      };
    } catch (error) {
      throw new Error(`Failed to search members: ${error.message}`);
    }
  }

  // Get member statistics
  async getMemberStats() {
    try {
      const stats = await memberRepository.getStats();
      return {
        success: true,
        data: stats,
        message: 'Member statistics retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to retrieve member statistics: ${error.message}`);
    }
  }

  // Activate member
  async activateMember(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error('Invalid member ID');
      }

      const member = await memberRepository.findById(id);
      if (!member) {
        throw new Error(`Member with ID ${id} not found`);
      }

      if (member.is_active) {
        throw new Error('Member is already active');
      }

      const updatedMember = await memberRepository.update(id, {
        username: member.username,
        email: member.email,
        first_name: member.first_name,
        last_name: member.last_name,
        is_active: true
      });

      return {
        success: true,
        data: updatedMember,
        message: 'Member activated successfully'
      };
    } catch (error) {
      throw new Error(`Failed to activate member: ${error.message}`);
    }
  }

  // Deactivate member
  async deactivateMember(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error('Invalid member ID');
      }

      const member = await memberRepository.findById(id);
      if (!member) {
        throw new Error(`Member with ID ${id} not found`);
      }

      if (!member.is_active) {
        throw new Error('Member is already inactive');
      }

      const updatedMember = await memberRepository.update(id, {
        username: member.username,
        email: member.email,
        first_name: member.first_name,
        last_name: member.last_name,
        is_active: false
      });

      return {
        success: true,
        data: updatedMember,
        message: 'Member deactivated successfully'
      };
    } catch (error) {
      throw new Error(`Failed to deactivate member: ${error.message}`);
    }
  }

  // Get member with tasks
  async getMemberWithTasks(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error('Invalid member ID');
      }

      const member = await memberRepository.findById(id);
      if (!member) {
        throw new Error(`Member with ID ${id} not found`);
      }

      // Get member's tasks (you'll need to implement this in taskRepository)
      const taskRepository = require('../repositories/taskRepository');
      const tasks = await taskRepository.findByMember(id);

      return {
        success: true,
        data: {
          ...member,
          tasks: tasks
        },
        message: 'Member with tasks retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to retrieve member with tasks: ${error.message}`);
    }
  }
}

module.exports = new MemberService();