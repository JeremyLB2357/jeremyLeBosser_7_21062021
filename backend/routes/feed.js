const express = require('express');
const router = express.Router();

const feedCtrl = require('../controllers/feed');

router.post('/publish', feedCtrl.publish);
router.post('/comment', feedCtrl.addComment);
router.post('/article/like/:id', feedCtrl.likeArticle);
router.post('/comment/like/:id', feedCtrl.likeComment);
router.delete('/:id', feedCtrl.deleteArticle);
router.delete('/comment/:id', feedCtrl.deleteComment);
router.get('/all', feedCtrl.showAll);
router.get('/:id', feedCtrl.showOne);


module.exports = router;