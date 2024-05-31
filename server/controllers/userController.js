const userRankingHistorySync = require('../services/user/userRankingHistorySync');
const userNicknameHistory = require('../services/user/userNicknameHistory');
const userMatches = require('../services/user/userMatches');

const getuserRanking = async (req, res) => {
  try {
    const response = await userRankingHistorySync.rankingsyncData();
    res.send(response);
  } catch (e) {
    res.send(e);
  }
};

const getuserNicknameHistory = async (req, res) => {
  const { nickname } = req.query;
  try {
    const response = await userNicknameHistory.nicknameHistory(nickname);
    res.send(response);
  } catch (e) {
    res.send(e);
  }
};

const getuserMatches = async (req, res) => {
  const { nickname } = req.query;
  try {
    const response = await userMatches.matchesAPI(nickname);
    res.send(response);
  } catch (e) {
    res.send(e);
  }
};

const userController = {
  getuserRanking,
  getuserNicknameHistory,
  getuserMatches,
};

module.exports = userController;
