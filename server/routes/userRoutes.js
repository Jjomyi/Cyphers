const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/user-sync', userController.syncUser);
router.get('/username', userController.getUserName);

module.exports = router;
