const express = require('express');
const router = express.Router();

const feedCtrl = require('../controllers/feed');

router.post('/publish', feedCtrl.publish);
router.post('/comment', feedCtrl.addComment);
router.delete('/article', feedCtrl.deleteArticle);
router.delete('/comment', feedCtrl.deleteComment);
router.get('/all', feedCtrl.showAll);
router.get('/', feedCtrl.showOne);


module.exports = router;