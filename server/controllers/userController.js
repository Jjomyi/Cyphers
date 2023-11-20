const userModel = require('../models/userModel');
const userService = require('../services/userService');

const getUserName = async (req, res) => {
  const { name } = req.query;
  const result = await userModel.getuserName(name);

  res.send(result);
};

const syncUser = async (req, res) => {
  try {
    await userService.processUserData();

    res.send('success');
  } catch (e) {
    res.send(e);
    res.status(500);
  }
};

const userController = {
  syncUser,
  getUserName,
};

module.exports = userController;
