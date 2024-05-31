const axios = require('axios');
const userModel = require('../../models/userModel');

const APIKEY = process.env.API_KEY;

const matchesAPI = async (nickname) => {
  try {
    const playerAPI_URL = `https://api.neople.co.kr/cy/players`;
    const player = await axios.get(playerAPI_URL, {
      params: {
        nickname: nickname,
        apikey: APIKEY,
      },
    });
    const userPlayerId = player.data.rows[0].playerId;
    const matchesAPI_URL = `https://api.neople.co.kr/cy/players/${userPlayerId}/matches`;
    const matches = await axios.get(matchesAPI_URL, {
      params: {
        gameTypeId: 'rating',
        limit: '100',
        apikey: APIKEY,
      },
    });
    if (matches) {
      const { playerId, nickname } = matches.data;

      const rows = await userModel.checkDuplicateUser(playerId, nickname);

      if (rows.length === 0) {
        await userModel.insertUser(playerId, nickname);
        console.log(`추가된: playerId: ${playerId}, nickname: ${nickname}`);
      } else {
        console.log(`이미 존재하는 playerId: ${playerId}`);
      }
    } else {
      console.log('추가할 데이터가 없습니다.');
    }
    return matches.data;
  } catch (e) {
    console.log(e);
  }
};

const userMatches = {
  matchesAPI,
};

module.exports = userMatches;
