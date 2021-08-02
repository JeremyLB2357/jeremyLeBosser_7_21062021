const express = require('express');
const router = express.Router();

const rateLimit = require('../middlewares/rate-limit');
const auth = require('../middlewares/auth');
const checkRigth = require('../middlewares/check-user-right');
const profileCtrl = require('../controllers/profile');

router.put('/:id', rateLimit.global, auth, checkRigth.toUser, profileCtrl.modify);
router.get('/me/myposts', rateLimit.global, auth, profileCtrl.showMyPosts);
router.get('/:id', rateLimit.global, auth, profileCtrl.show);
router.delete('/:id', rateLimit.global, auth, checkRigth.toUser, profileCtrl.delete);


module.exports = router;