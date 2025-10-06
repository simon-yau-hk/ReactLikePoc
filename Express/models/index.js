// models/index.js - Standard Sequelize Pattern
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create Sequelize instance
const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'task_management',
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
  logging: console.log, 
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Load all models dynamically
const models = {};
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize);
    models[model.name] = model;
  });

// Define associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Set up associations manually
if (models.Member && models.Task) {
  models.Member.hasMany(models.Task, {
    foreignKey: 'member_id',
    as: 'tasks',
    onDelete: 'SET NULL'
  });
  
  models.Task.belongsTo(models.Member, {
    foreignKey: 'member_id',
    as: 'member'
  });
}

if (models.Task && models.TaskItem) {
  models.Task.hasMany(models.TaskItem, {
    foreignKey: 'task_id',
    as: 'taskItems',
    onDelete: 'CASCADE'
  });
  
  models.TaskItem.belongsTo(models.Task, {
    foreignKey: 'task_id',
    as: 'task'
  });
}

module.exports = { sequelize, ...models };