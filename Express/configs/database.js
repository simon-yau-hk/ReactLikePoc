// configs/database.js - Sequelize Configuration
const { Sequelize } = require('sequelize');
require('dotenv').config();

class Database {
  constructor() {
    this.sequelize = null;
  }

  async connect() {
    try {
      this.sequelize = new Sequelize({
        host: process.env.DB_HOST || 'localhost',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'task_management',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false, // Set to console.log to see SQL queries
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

      // Test the connection
      await this.sequelize.authenticate();
      console.log('✅ Database connected successfully with Sequelize');
      
      return this.sequelize;
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      throw error;
    }
  }

  async disconnect() {
    if (this.sequelize) {
      await this.sequelize.close();
      console.log('✅ Database disconnected');
    }
  }

  getSequelize() {
    if (!this.sequelize) {
      throw new Error('Database not connected');
    }
    return this.sequelize;
  }

  // Sync database (create tables if they don't exist)
  async syncDatabase(force = false) {
    try {
      // Use alter: true to work with existing schema
      await this.sequelize.sync({ 
        force: false,  // Never force recreate
        alter: false  // Don't alter existing tables
      });
      console.log('✅ Database synchronized successfully (existing schema preserved)');
    } catch (error) {
      console.error('❌ Database sync failed:', error.message);
      throw error;
    }
  }
}

module.exports = new Database();