const jwt = require('jsonwebtoken');
const fs = require('fs');

const { Article, Comment } = require('../models');

exports.showAll = (req, res, next) => {
    Article.findAll({ include: Comment })
    .then((articles) => res.status(200).json(articles))
    .catch(error => res.status(400).json(error))
};

exports.publish = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let imageUrl = null;
    if (req.file) {
        console.log('fichier il y a');
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    Article.create({
        title: req.body.title,
        content: req.body.content,
        userId: userId,      //aller chercher l'id dans le token
        imageUrl: imageUrl
    })
    .then(() => res.status(200).json({ message: 'publication faite'}))
    .catch(error => res.status(400).json(error))
};

exports.deleteArticle = (req, res, next) => {
    Article.findOne({ where: { articleId: req.params.id} })
    .then(article => {
        const filename = article.imageUrl.split('/images/')[1];
        Article.destroy({ where: { articleId: req.params.id }})
        .then(() => {
            fs.unlink(`images/${filename}`, () => {
                res.status(200).json({ message: 'suppression faite' });
            })
        })
        .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(404).json(error));
    
};

exports.addComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    console.log('je commente un post');
    Comment.create({
        content: req.body.content,
        userId: userId, //aller chercher l'id dans le token
        articleId: req.body.articleId
    })
    .then(() => res.status(200).json({ message: 'commentaire ajouté'}))
    .catch(error => res.status(400).json(error))
};

exports.showOne = (req, res, next) => {
    Article.findOne({ where: { articleId: req.params.id}, include: Comment })
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => res.status(404).json(error));
};

exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where: { commentId: req.params.id }})
    .then(() => {
        res.status(200).json({ message: 'suppression faite' });
    })
    .catch(error => res.status(400).json(error));
};

exports.likeArticle = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    if (req.body.like == 0) {
        console.log('le post me laisse indifférent');
        Article.findOne({ where: { articleId: req.params.id } })
            .then(response => {
                const articleUpdated = response.dataValues;
                let arrayOfLikedUsers = articleUpdated.usersLiked.split(',');
                for (let i in arrayOfLikedUsers) {
                    if (arrayOfLikedUsers[i] == userId) {
                        arrayOfLikedUsers.splice(i, 1);
                        articleUpdated.likes -= 1;
                    }
                }
                articleUpdated.usersLiked = arrayOfLikedUsers.toString();
                
                Article.update(
                    articleUpdated,
                    { where: { articleId: req.params.id } }
                    )
                    .then(() => res.status(200).json({ message: 'Modifications faites !' }))
                    .catch(error => res.status(400).json (error));
            })
            .catch(error => res.status(404).json(error))
    }
    if (req.body.like == 1) {
        console.log('le post est cool');
        Article.findOne({ where: { articleId: req.params.id } })
            .then(response => {
                const articleUpdated = response.dataValues;
                if (articleUpdated.usersLiked == null) {
                    articleUpdated.likes += 1;
                    articleUpdated.usersLiked = userId;
                } else {
                    let arrayOfLikedUsers = articleUpdated.usersLiked.split(',');
                    for (let i in arrayOfLikedUsers) {
                        if (arrayOfLikedUsers[i] == userId) {
                           throw 'already liked';
                        }
                    }
                    arrayOfLikedUsers.push(userId);
                    articleUpdated.usersLiked = arrayOfLikedUsers.toString();
                    articleUpdated.likes += 1;
                }

                Article.update(
                    articleUpdated,
                    { where: { articleId: req.params.id } }
                    )
                    .then(() => res.status(200).json({ message: 'Modifications faites !' }))
                    .catch(error => res.status(400).json (error));
            })
            .catch(error => res.status(404).json(error));
    }
};

exports.likeComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    if (req.body.like == 0) {
        console.log('le post me laisse indifférent');
        Comment.findOne({ where: { commentId: req.params.id } })
            .then(response => {
                const commentUpdated = response.dataValues;
                let arrayOfLikedUsers = commentUpdated.usersLiked.split(',');
                for (let i in arrayOfLikedUsers) {
                    if (arrayOfLikedUsers[i] == userId) {
                        arrayOfLikedUsers.splice(i, 1);
                        commentUpdated.likes -= 1;
                    }
                }
                commentUpdated.usersLiked = arrayOfLikedUsers.toString();
                
                Comment.update(
                    commentUpdated,
                    { where: { commentId: req.params.id } }
                    )
                    .then(() => res.status(200).json({ message: 'Modifications faites !' }))
                    .catch(error => res.status(400).json (error));
            })
            .catch(error => res.status(404).json(error))
    }
    if (req.body.like == 1) {
        console.log('le post est cool');
        Comment.findOne({ where: { commentId: req.params.id } })
            .then(response => {
                const commentUpdated = response.dataValues;
                if (commentUpdated.usersLiked == null) {
                    commentUpdated.likes += 1;
                    commentUpdated.usersLiked = userId;
                } else {
                    let arrayOfLikedUsers = commentUpdated.usersLiked.split(',');
                    for (let i in arrayOfLikedUsers) {
                        if (arrayOfLikedUsers[i] == userId) {
                           throw 'already liked';
                        }
                    }
                    arrayOfLikedUsers.push(userId);
                    commentUpdated.usersLiked = arrayOfLikedUsers.toString();
                    commentUpdated.likes += 1;
                }

                Comment.update(
                    commentUpdated,
                    { where: { commentId: req.params.id } }
                    )
                    .then(() => res.status(200).json({ message: 'Modifications faites !' }))
                    .catch(error => res.status(400).json (error));
            })
            .catch(error => res.status(404).json(error));
    }
};