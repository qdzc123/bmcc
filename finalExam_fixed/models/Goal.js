const { DataTypes } = require('sequelize');
const sequelize = require('../models/sequelize');

const Goal = sequelize.define('Goal', {
  description: { type: DataTypes.STRING, allowNull: false },
  deadline: { type: DataTypes.DATE, allowNull: true }
});

module.exports = Goal;