// models/Task.js - Standard Sequelize Pattern
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: [1, 200],
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    priority: {
      type: DataTypes.ENUM('urgent', 'high', 'medium', 'low'),
      defaultValue: 'medium',
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'cancelled'),
      defaultValue: 'pending',
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true
      }
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'members',
        key: 'id'
      }
    }
  }, {
    tableName: 'tasks',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: []
  });

  // Instance methods
  Task.prototype.isOverdue = function() {
    if (!this.due_date) return false;
    return new Date() > new Date(this.due_date) && this.status !== 'completed';
  };

  Task.prototype.getDaysUntilDue = function() {
    if (!this.due_date) return null;
    const now = new Date();
    const due = new Date(this.due_date);
    const diffTime = due - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Class methods
  Task.findByMember = function(memberId) {
    return this.findAll({ where: { member_id: memberId } });
  };

  Task.findByStatus = function(status) {
    return this.findAll({ where: { status } });
  };

  Task.findOverdue = function() {
    const { Op } = require('sequelize');
    return this.findAll({
      where: {
        due_date: { [Op.lt]: new Date() },
        status: { [Op.ne]: 'completed' }
      }
    });
  };

  Task.search = function(query) {
    const { Op } = require('sequelize');
    return this.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } }
        ]
      }
    });
  };

  return Task;
};