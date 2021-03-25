const Sequelize = require('sequelize');

const sequelize = new Sequelize('whiteboard', 'root', 'AHHCR!123', {
  host: 3306,
  dialect: 'mysql',
  pool: {
      max: 5,
      min: 0,
      idle: 30000
  }
});

module.exports = { sequelize };