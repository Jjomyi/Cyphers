const APIKEY = process.env.API_KEY;

// const nicknameHistorya = async (nickname) => {
//   try {
//     const response = await axios.get(url);

//     const rows = await userModel.getuserName(nickname);
//     return rows;
//     // console.log(`플레이아이디 : ${response.data.rows[0].playerId}`);

//     // const rows = await userModel.getuserName(response.data.rows[0].playerId);
//     // return rows;
//   } catch (e) {
//     console.log(e);
//   }
// };

// const nicknameHistory = {
//   nicknameHistorya,
// };

// module.exports = nicknameHistory;

// nicknameHistory.js

const userModel = require('../../models/userModel');
const axios = require('axios');

const nicknameHistorya = async (nickname) => {
  try {
    const url = `https://api.neople.co.kr/cy/players?nickname=${nickname}&wordType=<wordType>&apikey=${APIKEY}`;
    const response = await axios.get(url);

    const playerId = response.data.rows[0].playerId; // 플레이어 ID 가져오기

    const rows = await userModel.getuserName(playerId);
    return rows;
  } catch (e) {
    console.error(e);
    throw e; // 예외 처리는 호출자에게 위임합니다.
  }
};

const nicknameHistory = {
  nicknameHistorya,
};

module.exports = nicknameHistory;
