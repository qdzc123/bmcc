const { DataTypes } = require('sequelize');
const sequelize = require('../models/sequelize');

const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = Task;