
const { v4: uuidv4 } = require('uuid');

const { Article, Comment } = require('../models');

exports.showAll = (req, res, next) => {
    Article.findAll({ include: Comment })
    .then((articles) => res.status(200).json(articles))
    .catch(error => res.status(400).json(error))
};

exports.publish = (req, res, next) => {
    Article.create({
        title: req.body.title,
        content: req.body.content,
        userId: 2   //aller chercher l'id dans le token
    })
    .then(() => res.status(200).json({ message: 'publication faite'}))
    .catch(error => res.status(400).json(error))
};

exports.deleteArticle = (req, res, next) => {
    Article.destroy({ where: { articleId: req.params.id }})
    .then(() => {
        res.status(200).json({ message: 'suppression faite' });
    })
    .catch(error => res.status(400).json(error));
};

exports.addComment = (req, res, next) => {
    console.log('je commente un post');
    Comment.create({
        content: req.body.content,
        userId: req.body.userId, //aller chercher l'id dans le token
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
    if (req.body.like == 0) {
        console.log('le post me laisse indifférent');
        Article.findOne({ where: { articleId: req.params.id} })   //on va chercher les infos de la sauce
            .then(article => {
                const articleUpdated = article;
                let arrayOfLikedUsers = article.usersLiked;
                let numberOfLikes = article.likes;
                //on parcours les tableaux pour supprimer l'user et diminuer le nombre de like ou dislike
                for (let i in arrayOfLikedUsers) {
                    if (arrayOfLikedUsers[i] == req.body.userId) {  //on va cherche l'id dans le token
                        articleUpdated.usersLiked = arrayOfLikedUsers.splice(i, 1);
                        articleUpdated.likes = numberOfLikes - 1;
                    }
                }
                //on envoie les données à la BDD
                Article.update(
                    articleUpdated,
                    { where: { articleId: req.params.id } }
                    )
                    .then(() => res.status(200).json({ message: 'Modifications faites !' }))
                    .catch(error => res.status(400).json (error));
            })
            .catch(error => res.status(404).json({ error }));
    }
    
};