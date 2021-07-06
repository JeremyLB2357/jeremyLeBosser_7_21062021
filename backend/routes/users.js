const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');
const test = require('../middlewares/capture');

router.post('/signup', test, userCtrl.signup);
router.post('/login', test, userCtrl.login);


module.exports = router;