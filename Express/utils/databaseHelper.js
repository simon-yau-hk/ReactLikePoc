// utils/databaseHelper.js - Database connection helper for repositories
const database = require('../configs/database');

let isConnected = false;

const ensureConnected = async () => {
  if (!isConnected) {
    await database.connect();
    isConnected = true;
  }
  return database.getSequelize();
};

module.exports = { ensureConnected };
