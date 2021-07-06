const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptoJS = require('crypto-js');

const { sequelize, User } = require('../models');

exports.show = (req, res, next) => {
    User.findOne({ where: { userId: req.params.id}})
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => res.status(404).json({ error: error }));
};

exports.delete = (req, res, next) => {
    User.destroy({ where: { userId: req.params.id }})
    .then(() => {
        console.log('je quitte le forum');
        res.status(200).json({ message: 'suppression faite' });
    })
    .catch(error => res.status(400).json({ error: error }));
};

exports.modify = (req, res, next) => {
    const userUpdated = { ...req.body };
    if (!userUpdated.password) {
        User.update(userUpdated, { where: { userId: req.params.id } })
        .then(() => res.status(200).json({ message: 'modification faite' }))
        .catch(error => res.status(400).json({ error: error }))
    } else {
        bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            userUpdated.password = hash;
            User.update(userUpdated, { where: { userId: req.params.id } })
            .then(() => res.status(200).json({ message: 'modification faite' }))
            .catch(error => res.status(400).json({ error: error }))
        })
        .catch(error => res.status(500).json({ error: error }))
    }
};

//à implémenter
exports.showMyPosts = (req, res, next) => {
    console.log('voici mes posts');
    res.status(200).json({ message: 'voilà ce que tu as déjà posté' });
};