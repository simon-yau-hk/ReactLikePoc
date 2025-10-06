// test-connection.js - Test Database Connection
const database = require('./configs/database');

async function testConnection() {
  try {
    console.log('🧪 Testing database connection...');
    
    // Connect to database
    await database.connect();
    
    // Test a simple query
    const sequelize = database.getSequelize();
    await sequelize.authenticate();
    
    console.log('✅ Database connection successful!');
    console.log('📊 Database:', sequelize.getDatabaseName());
    console.log('🔗 Host:', sequelize.options.host);
    console.log('👤 User:', sequelize.options.username);
    
    // Close connection
    await database.disconnect();
    console.log('✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('💡 Make sure your database is running and credentials are correct');
    process.exit(1);
  }
}

testConnection();
