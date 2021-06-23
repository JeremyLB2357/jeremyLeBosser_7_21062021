const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('groupomania', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
global.sequelize = sequelize;