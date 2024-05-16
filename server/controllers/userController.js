const userHistorySync = require('../services/user/userHistorySync');

const get_userRankingHistorySync = async (req, res) => {
  try {
    const response = await userHistorySync.featch();
    const data = response;
    res.send(data);
  } catch (e) {
    res.send(e);
    console.log(e);
  }
};

const userController = {
  get_userRankingHistorySync,
};

module.exports = userController;
