// scripts/startServer.js - Proper Server Initialization
const database = require('../configs/database');

async function startServer() {
  try {
    console.log('🚀 Starting server initialization...');
    
    // First, connect to database
    console.log('📡 Connecting to database...');
    await database.connect();
    
    // Then load models (this will now work because database is connected)
    console.log('📋 Loading models...');
    const { Member, Task, TaskItem } = require('../models');
    
    // Initialize associations
    console.log('🔗 Setting up model associations...');
    require('../models/index');
    
    // Now start the Express server
    console.log('🌐 Starting Express server...');
    const server = require('../server');
    
    console.log('✅ Server initialization completed!');
    
  } catch (error) {
    console.error('❌ Server initialization failed:', error.message);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await database.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down server...');
  await database.disconnect();
  process.exit(0);
});

// Start the server
startServer();
