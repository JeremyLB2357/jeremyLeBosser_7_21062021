const express = require('express');
const router = express.Router();

const multer = require('../middlewares/multer-config');
const rateLimit = require('../middlewares/rate-limit');
const auth = require('../middlewares/auth');
const checkRigth = require('../middlewares/check-user-right');
const feedCtrl = require('../controllers/feed');


router.post('/publish', rateLimit.global, auth, multer, feedCtrl.publish);
router.post('/comment', rateLimit.global, auth, feedCtrl.addComment);
router.post('/article/like/:id', rateLimit.global, auth, feedCtrl.likeArticle);
router.post('/comment/like/:id', rateLimit.global, auth, feedCtrl.likeComment);
router.delete('/article/:id', rateLimit.global, auth, checkRigth.toArticle, feedCtrl.deleteArticle);
router.delete('/comment/:id', rateLimit.global, auth, checkRigth.toComment, feedCtrl.deleteComment);
router.get('/all', rateLimit.global, auth, feedCtrl.showAll);
router.get('/:id', rateLimit.global, auth, feedCtrl.showOne);


module.exports = router;