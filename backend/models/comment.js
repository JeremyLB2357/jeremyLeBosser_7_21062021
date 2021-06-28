'use strict';
const {
  Model
} = require('sequelize');
const { showComments } = require('../controllers/feed');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Article }) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId', as: 'user'});
      this.belongsTo(Article, {foreignKey: 'articleId', as: 'article'});
    }
  };
  Comment.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV
    },
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
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'comments',
    modelName: 'Comment',
  });
  return Comment;
};