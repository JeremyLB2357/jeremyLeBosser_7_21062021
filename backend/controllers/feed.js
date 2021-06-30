
const { v4: uuidv4 } = require('uuid');

const { Article, Comment } = require('../models');

exports.showAll = (req, res, next) => {
    Article.findAll({ include: Comment })
    .then((articles) => res.status(200).json(articles))
    .catch(error => res.status(400).json(error))
};

exports.publish = (req, res, next) => {
    Article.create({
        uuid: uuidv4(),
        content: req.body.post.content,
        userId: 2
    })
    .then(() => res.status(200).json({ message: 'publication faite'}))
    .catch(error => res.status(400).json(error))
};

exports.deleteArticle = (req, res, next) => {
    Article.destroy({ where: { uuid: req.query.id }})
    .then(() => {
        res.status(200).json({ message: 'suppression faite' });
    })
    .catch(error => res.status(400).json({ error }));
};

exports.addComment = (req, res, next) => {
    console.log('je commente un post');
    Comment.create({
        content: req.body.comment.content,
        userId: req.body.comment.userId,
        articleId: req.body.comment.articleId
    })
    .then(() => res.status(200).json({ message: 'commentaire ajouté'}))
    .catch(error => res.status(400).json(error))
};

exports.showOne = (req, res, next) => {
    Article.findOne({ where: { articleId: req.query.id}, include: Comment })
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => res.status(404).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where: { uuid: req.query.id }})
    .then(() => {
        res.status(200).json({ message: 'suppression faite' });
    })
    .catch(error => res.status(400).json({ error }));
};