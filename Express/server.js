// server.js - Standard Pattern
const { sequelize } = require('./models');
const app = require('./app');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
    
    // Start server
    app.listen(PORT, () => {
      console.log('🚀 Server is running!');
      console.log(`📍 Server: http://localhost:${PORT}`);
      console.log('📊 Database: Connected with Sequelize ORM');
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();