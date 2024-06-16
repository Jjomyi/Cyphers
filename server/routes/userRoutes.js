const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/getuserRanking', userController.getuserRanking);
router.get('/nicknameHistory', userController.getuserNicknameHistory);
// router.get('/userSearch', userController.getuserMatches);
// router.get('/usera', userController.getuserSearch);

module.exports = router;
