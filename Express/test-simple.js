// test-simple.js - Simple Database Connection Test
const database = require('./configs/database');

async function testSimple() {
  try {
    console.log('🧪 Testing simple database connection...');
    
    // Connect to database
    await database.connect();
    console.log('✅ Database connected successfully!');
    
    // Test a simple query
    const sequelize = database.getSequelize();
    const [results] = await sequelize.query('SELECT 1 as test');
    console.log('✅ Query test successful:', results[0]);
    
    // Close connection
    await database.disconnect();
    console.log('✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testSimple();
