const { Sequelize, DataTypes } = require('sequelize');
const User = require('./User');
const Article = require('./Article');

module.exports = sequelize.define('User', {
    commentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'userId'
        }
    },
    articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Article,
            key: 'articleId'
        }
    }
});