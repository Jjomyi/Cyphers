const userRankingHistorySync = require('../services/user/userRankingHistorySync');

const getuserRanking = async (req, res) => {
  try {
    const response = await userRankingHistorySync.rankingsyncData();
    res.send(response);
  } catch (e) {
    res.send(e);
  }
};

const userController = {
  getuserRanking,
};

module.exports = userController;
