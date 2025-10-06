// models/TaskItem.js - Standard Sequelize Pattern
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TaskItem = sequelize.define('TaskItem', {
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
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tasks',
        key: 'id'
      }
    }
  }, {
    tableName: 'task_items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: []
  });

  // Instance methods
  TaskItem.prototype.markCompleted = function() {
    this.is_completed = true;
    this.completed_at = new Date();
    return this.save();
  };

  TaskItem.prototype.markIncomplete = function() {
    this.is_completed = false;
    this.completed_at = null;
    return this.save();
  };

  // Class methods
  TaskItem.findByTaskId = function(taskId) {
    return this.findAll({ 
      where: { task_id: taskId },
      order: [['order', 'ASC']]
    });
  };

  TaskItem.findCompletedByTaskId = function(taskId) {
    return this.findAll({ 
      where: { 
        task_id: taskId,
        is_completed: true 
      },
      order: [['completed_at', 'DESC']]
    });
  };

  TaskItem.getStatsByTaskId = function(taskId) {
    return this.findAll({
      where: { task_id: taskId },
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'total_items'],
        [sequelize.fn('SUM', sequelize.literal('CASE WHEN is_completed = 1 THEN 1 ELSE 0 END')), 'completed_items'],
        [sequelize.fn('SUM', sequelize.literal('CASE WHEN is_completed = 0 THEN 1 ELSE 0 END')), 'pending_items']
      ],
      raw: true
    });
  };

  return TaskItem;
};