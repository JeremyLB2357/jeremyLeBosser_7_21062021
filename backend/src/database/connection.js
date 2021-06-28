const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;


const sequelize = new Sequelize('groupomania', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
global.sequelize = sequelize;