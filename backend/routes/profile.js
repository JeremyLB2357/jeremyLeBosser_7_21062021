const express = require('express');
const router = express.Router();

const profileCtrl = require('../controllers/profile');

router.post('/me', profileCtrl.modify);
router.get('/me/myposts', profileCtrl.showMyPosts);
router.get('/me', profileCtrl.show);
router.delete('/me', profileCtrl.delete);


module.exports = router;