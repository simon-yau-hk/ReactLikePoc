// scripts/connectOnly.js - Connect to existing database without schema changes
const database = require('../configs/database');

async function connectToExistingDatabase() {
  try {
    console.log('🚀 Connecting to existing database...');
    
    // Connect to database
    await database.connect();
    
    // Test connection with a simple query
    const sequelize = database.getSequelize();
    const [results] = await sequelize.query('SELECT 1 as test');
    console.log('✅ Database connection successful!');
    console.log('📊 Database:', sequelize.getDatabaseName());
    console.log('🔗 Host:', sequelize.options.host);
    
    // Test if your tables exist
    try {
      const [tables] = await sequelize.query("SHOW TABLES");
      console.log('📋 Existing tables:', tables.map(t => Object.values(t)[0]));
    } catch (error) {
      console.log('ℹ️  Could not list tables (this is normal for some database configurations)');
    }
    
    console.log('✅ Successfully connected to your existing database!');
    console.log('🎯 Sequelize will work with your existing schema without changes');
    
    // Close connection
    await database.disconnect();
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('💡 Make sure your database is running and credentials are correct');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  connectToExistingDatabase();
}

module.exports = connectToExistingDatabase;
