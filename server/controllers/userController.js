const userRankingHistorySync = require('../services/user/userRankingHistorySync');
const userNicknameHistory = require('../services/user/userNicknameHistory');

const getuserRanking = async (req, res) => {
  try {
    const response = await userRankingHistorySync.rankingsyncData();
    res.send(response);
  } catch (e) {
    res.send(e);
  }
};

const getuserNicknameHistory = async (req, res) => {
  // nickname 이건 서비스에서 해야 하는 것 아닌지 (서비스에서 하면 될꺼 같은데?) 컨트롤러에서는 보여주기만 하고
  const { nickname } = req.query;
  try {
    const response = await userNicknameHistory.nicknameHistory(nickname);
    res.send(response);
  } catch (e) {
    console.log(e);
  }
};

const userController = {
  getuserRanking,
  getuserNicknameHistory,
};

module.exports = userController;
