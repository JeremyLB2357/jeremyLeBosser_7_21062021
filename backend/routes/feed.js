const express = require('express');
const router = express.Router();

const feedCtrl = require('../controllers/feed');

router.post('/post/publish', feedCtrl.publish);
router.post('/post/comment', feedCtrl.addComment);
router.delete('/post/:id', feedCtrl.delete);
router.get('/post/all', feedCtrl.showAll);
router.get('/post/comment/:id', feedCtrl.showComments);


module.exports = router;