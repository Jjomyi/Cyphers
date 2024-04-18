const userModel = require('../models/userModel');
const userService = require('../services/user/userPlayerInfo');

const getUserMatch = async (req, res) => {
  try {
    const name = req.query.name;
    const userMatch = await userService.userMatchesAPI(name);
    res.send(userMatch);
  } catch (error) {
    console.error('Error fetching user match history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const usercontroller = {
  getUserMatch,
};

module.exports = usercontroller;
