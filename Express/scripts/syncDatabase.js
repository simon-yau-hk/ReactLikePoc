// scripts/syncDatabase.js - Database Sync Script
const database = require('../configs/database');

async function syncDatabase() {
  try {
    console.log('🔄 Starting database synchronization...');
    
    // Connect to database
    await database.connect();
    
    // Force sync (recreate tables - WARNING: This will delete all data!)
    console.log('⚠️  WARNING: This will recreate all tables and delete existing data!');
    console.log('🔄 Synchronizing database...');
    await database.syncDatabase(true); // true = force recreate
    
    console.log('✅ Database synchronization completed successfully!');
    console.log('🗑️  All existing data has been deleted and tables recreated');
    
    // Close connection
    await database.disconnect();
    
  } catch (error) {
    console.error('❌ Database synchronization failed:', error.message);
    process.exit(1);
  }
}


module.exports = syncDatabase;
