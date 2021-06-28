const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptoJS = require('crypto-js');

const { sequelize, User } = require('../models');

exports.show = (req, res, next) => {
    User.findOne({ where: { uuid: req.query.id}})
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => res.status(404).json({ error }));
};

exports.delete = (req, res, next) => {
    User.destroy({ where: { lastName: req.body.user.lastName }})
    .then(() => {
        console.log('je quitte le forum');
        res.status(200).json({ message: 'suppression faite' });
    })
    .catch(error => res.status(400).json({ error }));
};

exports.modify = (req, res, next) => {
    const userUpdated = { ...req.body.user };
    console.log('userUpdated :' + userUpdated);
    if (!userUpdated.password) {
        User.update(userUpdated, { where: { uuid: req.query.id } })
        .then(() => res.status(200).json({ message: 'modification faite' }))
        .catch(error => res.status(400).json({ error }))
    } else {
        bcrypt.hash(req.body.user.password, 2)
        .then((hash) => {
            userUpdated.password = hash;
            User.update(userUpdated, { where: { uuid: req.query.id } })
            .then(() => res.status(200).json({ message: 'modification faite' }))
            .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
    }
    /*User.update(userUpdated, { where: { uuid: req.query.id } })
    .then(() => res.status(200).json({ message: 'modification faite' }))
    .catch(error => res.status(400).json({ error }));*/
};

exports.showMyPosts = (req, res, next) => {
    console.log('voici mes posts');
    res.status(200).json({ message: 'voilà ce que tu as déjà posté' });
};