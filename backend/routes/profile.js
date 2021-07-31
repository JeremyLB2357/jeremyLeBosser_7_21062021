const express = require('express');
const router = express.Router();

const profileCtrl = require('../controllers/profile');
const test = require('../middlewares/capture');

router.put('/:id', profileCtrl.modify);
router.get('/me/myposts', profileCtrl.showMyPosts);
router.get('/:id', profileCtrl.show);
router.delete('/:id', profileCtrl.delete);


module.exports = router;