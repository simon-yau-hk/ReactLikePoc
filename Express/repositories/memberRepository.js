// repositories/memberRepository.js - Standard Sequelize Pattern
const { Member, Task, TaskItem } = require('../models');
class MemberRepository {
  // Get all members
  async findAll() {
    try {
      const members = await Member.findAll({
        attributes: { exclude: ['password_hash'] },
        order: [['created_at', 'DESC']]
      });
      return members;
    } catch (error) {
      throw new Error(`Failed to fetch members: ${error.message}`);
    }
  }


  // Get all members with tasks and task items
  async findAllWithTasks() {
    try {
      const members = await Member.findAll({
        attributes: { exclude: ['password_hash'] },
        include: [{
          model: Task,
          as: 'tasks',
          include: [{
            model: TaskItem,
            as: 'taskItems',
            order: [['order', 'ASC']]
          }],
          order: [['created_at', 'DESC']]
        }],
        order: [['created_at', 'DESC']]
      });
      return members;
    } catch (error) {
      throw new Error(`Failed to fetch members with tasks: ${error.message}`);
    }
  }

  // Get all members with tasks and task items
  async findAllWithTasksV2() {
    try {
      const members = await Member.findAll({
        include: [{
          model: Task, as: 'tasks',
          include: [{model: TaskItem, as: 'taskItems'}]
        }]
      });
      return members;
    } catch (error) {
      throw new Error(`Failed to fetch members with tasks V2: ${error.message}`);
    }
  }


  // Get member by ID
  async findById(id) {
    try {
      const member = await Member.findByPk(id, {
        attributes: { exclude: ['password_hash'] }
      });
      return member;
    } catch (error) {
      throw new Error(`Failed to fetch member with ID ${id}: ${error.message}`);
    }
  }

  // Get member by username
  async findByUsername(username) {
    try {
      const member = await Member.findByUsername(username);
      if (member) {
        // Exclude password_hash from response
        const { password_hash, ...memberWithoutPassword } = member.toJSON();
        return memberWithoutPassword;
      }
      return null;
    } catch (error) {
      throw new Error(`Failed to fetch member with username ${username}: ${error.message}`);
    }
  }

  // Get member by email
  async findByEmail(email) {
    try {
      const member = await Member.findByEmail(email);
      if (member) {
        // Exclude password_hash from response
        const { password_hash, ...memberWithoutPassword } = member.toJSON();
        return memberWithoutPassword;
      }
      return null;
    } catch (error) {
      throw new Error(`Failed to fetch member with email ${email}: ${error.message}`);
    }
  }

  // Create new member
  async create(memberData) {
    try {
      const member = await Member.create(memberData);
      // Exclude password_hash from response
      const { password_hash, ...memberWithoutPassword } = member.toJSON();
      return memberWithoutPassword;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Username or email already exists');
      }
      throw new Error(`Failed to create member: ${error.message}`);
    }
  }

  // Update member
  async update(id, memberData) {
    try {
      const member = await Member.findByPk(id);
      if (!member) {
        return null;
      }

      await member.update(memberData);
      // Exclude password_hash from response
      const { password_hash, ...memberWithoutPassword } = member.toJSON();
      return memberWithoutPassword;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Username or email already exists');
      }
      throw new Error(`Failed to update member with ID ${id}: ${error.message}`);
    }
  }

  // Delete member
  async delete(id) {
    try {
      const member = await Member.findByPk(id);
      if (!member) {
        return false;
      }

      await member.destroy();
      return true;
    } catch (error) {
      throw new Error(`Failed to delete member with ID ${id}: ${error.message}`);
    }
  }

  // Get active members
  async findActive() {
    try {
      const members = await Member.findActive();
      return members.map(member => {
        const { password_hash, ...memberWithoutPassword } = member.toJSON();
        return memberWithoutPassword;
      });
    } catch (error) {
      throw new Error(`Failed to fetch active members: ${error.message}`);
    }
  }

  // Search members
  async search(query) {
    try {
      const members = await Member.search(query);
      return members.map(member => {
        const { password_hash, ...memberWithoutPassword } = member.toJSON();
        return memberWithoutPassword;
      });
    } catch (error) {
      throw new Error(`Failed to search members: ${error.message}`);
    }
  }

  // Get member statistics
  async getStats() {
    try {
      const { sequelize } = require('../models');
      const stats = await Member.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('id')), 'total_members'],
          [sequelize.fn('SUM', sequelize.literal('CASE WHEN is_active = 1 THEN 1 ELSE 0 END')), 'active_members']
        ],
        raw: true
      });
      return stats[0];
    } catch (error) {
      throw new Error(`Failed to fetch member statistics: ${error.message}`);
    }
  }

  // Get member with tasks
  async findByIdWithTasks(id) {
    try {
      const { Task } = require('../models');
      const member = await Member.findByPk(id, {
        attributes: { exclude: ['password_hash'] },
        include: [{
          model: Task,
          as: 'tasks',
          order: [['created_at', 'DESC']]
        }]
      });
      return member;
    } catch (error) {
      throw new Error(`Failed to fetch member with tasks: ${error.message}`);
    }
  }
}

module.exports = new MemberRepository();