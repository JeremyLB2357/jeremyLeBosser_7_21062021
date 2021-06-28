const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptoJS = require('crypto-js');

const { sequelize, User } = require('../models');

exports.show = (req, res, next) => {
    console.log('voici mon profile');
    res.status(200).json({ message: 'voilà tes infos' });
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
    console.log('je modifie mon profile');
    res.status(200).json({ message: 'modification faite' });
};

exports.showMyPosts = (req, res, next) => {
    console.log('voici mes posts');
    res.status(200).json({ message: 'voilà ce que tu as déjà posté' });
};