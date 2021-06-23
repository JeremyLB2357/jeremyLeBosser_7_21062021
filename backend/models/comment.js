'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
      this.belongsTo(models.Article, {foreignKey: 'articleId', as: 'article'});
    }
  };
  Comment.init({
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
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};