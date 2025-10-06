// scripts/initDatabase.js - Database Initialization Script
const database = require('../configs/database');
const { Member, Task, TaskItem } = require('../models');

async function initializeDatabase() {
  try {
    console.log('🚀 Starting database initialization...');
    
    // Connect to database
    await database.connect();
    
    // Sync database (work with existing schema)
    console.log('📋 Syncing with existing database schema...');
    await database.syncDatabase(false); // false = don't force recreate, preserve existing schema
    
    console.log('✅ Database initialization completed successfully!');
    console.log('📊 Working with existing schema: members, tasks, task_items');
    
    // Close connection
    await database.disconnect();
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;
