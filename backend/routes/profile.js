const express = require('express');
const router = express.Router();

const profileCtrl = require('../controllers/profile');
const test = require('../middlewares/capture');

router.put('/:id', test, profileCtrl.modify);
router.get('/me/myposts', test, profileCtrl.showMyPosts);
router.get('/:id', test, profileCtrl.show);
router.delete('/:id', test, profileCtrl.delete);


module.exports = router;