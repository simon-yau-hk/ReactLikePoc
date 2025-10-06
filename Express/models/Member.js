// models/Member.js - Standard Sequelize Pattern
const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  const Member = sequelize.define('Member', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(150),
      unique: true,
      allowNull: false,
      validate: {
        len: [3, 150],
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING(254),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [1, 254]
      }
    },
    first_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: [1, 30],
        notEmpty: true
      }
    },
    last_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: [1, 30],
        notEmpty: true
      }
    },
    password_hash: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        len: [1, 128],
        notEmpty: true
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    tableName: 'members',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    // Don't create indexes - use existing ones
    indexes: []
  });

  // Instance methods
  Member.prototype.getFullName = function() {
    return `${this.first_name} ${this.last_name}`;
  };

  Member.prototype.isAdult = function() {
    return true; // Placeholder
  };

  // Class methods
  Member.findByUsername = function(username) {
    return this.findOne({ where: { username } });
  };

  Member.findByEmail = function(email) {
    return this.findOne({ where: { email } });
  };

  Member.findActive = function() {
    return this.findAll({ where: { is_active: true } });
  };

  Member.search = function(query) {
    const { Op } = require('sequelize');
    return this.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.like]: `%${query}%` } },
          { email: { [Op.like]: `%${query}%` } },
          { first_name: { [Op.like]: `%${query}%` } },
          { last_name: { [Op.like]: `%${query}%` } }
        ]
      }
    });
  };

  return Member;
};