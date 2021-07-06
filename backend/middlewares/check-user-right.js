const jwt = require('jsonwebtoken');

const { User, Article, Comment } = require('../models');

exports.toUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    User.findOne({ where: {userId: userId} })
        .then(user => {
            if (userId == user.userId) {
                next();
            } else {
                res.status(401).json({ error: 'demande non authorisée' });
            }
        })
        .catch(error => res.status(404).json(error));
}

exports.toArticle = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    Article.findOne({ where: {articleId: req.params.id} })
        .then(article => {
            if (userId == article.userId) {
                next();
            } else {
                res.status(401).json({ error: 'demande non authorisée' });
            }
        })
        .catch(error => res.status(404).json(error));
}

exports.toComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    Comment.findOne({ where: {commentId: req.params.id} })
        .then(comment => {
            if (userId == comment.userId) {
                next();
            } else {
                res.status(401).json({ error: 'demande non authorisée' });
            }
        })
        .catch(error => res.status(404).json(error));
}