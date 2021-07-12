const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');
const test = require('../middlewares/capture');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router;