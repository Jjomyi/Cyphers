const userModel = require('../../models/userModel');

const nicknameHistory = async (nickname) => {
  try {
    const rows = await userModel.getuserName(nickname);

    if (rows.length === 0) {
      return `${nickname}님의 정보가 없습니다.`;
    }

    return rows;
  } catch (e) {
    console.log(e);
  }
};

const userNicknameHistory = {
  nicknameHistory,
};

module.exports = userNicknameHistory;
