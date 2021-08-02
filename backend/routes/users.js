const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');
const rateLimit = require('../middlewares/rate-limit');
const validator = require ('../middlewares/validator');

router.post('/signup', rateLimit.connexion, validator, userCtrl.signup);
router.post('/login', rateLimit.connexion, userCtrl.login);


module.exports = router;