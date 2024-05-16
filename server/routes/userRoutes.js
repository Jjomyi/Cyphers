const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/get-user-ranking-sync', userController.get_userRankingHistorySync);

module.exports = router;
