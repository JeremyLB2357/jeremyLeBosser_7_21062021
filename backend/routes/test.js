const express = require('express');
const router = express.Router();

const { sequelize, User } = require('../models');

router.use('/', (req, res, next) => {
    console.log('le test fonctionne');
    const jeremy = User.build({
        lastName: 'LB',
        firstName: 'Jeremy',
        email: 'test@email.com',
        password:'mdp',
        pseudo: 'Galad'
    })
    console.log(jeremy);
    res.status(200).json({ message: 'ça maaaarche !' });
});


module.exports = router;