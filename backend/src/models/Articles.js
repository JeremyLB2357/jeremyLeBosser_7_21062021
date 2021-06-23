const { Sequelize, DataTypes } = require('sequelize');
const User = require('./User');

module.exports = sequelize.define('Article', {
    articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: { 
        type: DataTypes.STRING 
    },
    content: {
        type: DataTypes.TEXT
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'userId'
        }
    }
});