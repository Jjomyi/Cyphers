const userRankingHistorySync = require('../services/ranking/ratingpoint');
const userNicknameHistory = require('../services/history/nicknameHistory');
// const userMatches = require('../services/user/userMatches');
const userSearch = require('../services/user/userSearch');

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
    const response = await userNicknameHistory.nicknameHistorya(nickname);
    res.send(response);
  } catch (e) {
    res.send(e);
  }
};

// const getuserMatches = async (req, res) => {
//   const { nickname } = req.query;
//   try {
//     const response = await userMatches.matchesAPI(nickname);
//     res.send(response);
//   } catch (e) {
//     res.send(e);
//   }
// };

// const getuserSearch = async (req, res) => {
//   const { nickname } = req.query;
//   try {
//     const response = await userSearch.matchesAPI(nickname);
//     res.send(response);
//   } catch (e) {
//     console.log(e);
//   }
// };

const userController = {
  getuserRanking,
  getuserNicknameHistory,
  // getuserMatches,
  // getuserSearch,
};

module.exports = userController;
