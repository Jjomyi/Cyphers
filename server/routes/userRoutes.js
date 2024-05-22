const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/getuserRanking', userController.getuserRanking);

module.exports = router;
