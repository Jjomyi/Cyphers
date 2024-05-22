const axios = require('axios');
const userModel = require('../../models/userModel');
const APIKEY = process.env.API_KEY;

// 나중에 스케줄러 추가 하기
// 현재는 통합랭킹 전체 유저가 보이는데 나는 닉네임을 변경한 유저 목록만 보고싶은데? 라면 어떻게 해야할까 짜보기
const rankingAPI = async (offset, limit) => {
  const rankingAPI_URL = `https://api.neople.co.kr/cy/ranking/ratingpoint`;
  try {
    const response = await axios.get(rankingAPI_URL, {
      params: {
        offset: offset,
        limit: limit,
        apikey: APIKEY,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const rankingsyncData = async (offset = 0, limit = 1000) => {
  try {
    const totalData = [];

    while (true) {
      const userinfo = await rankingAPI(offset, limit);
      totalData.push(...userinfo.rows);

      if (userinfo.rows.length !== limit) {
        break;
      }
      offset += limit;
    }
    console.log(
      `모든 데이터를 가져왔습니다 총 데이터 개수 : `,
      totalData.length
    );
    for (let i = 0; i < totalData.length; i++) {
      let playerId = totalData[i].playerId;
      let nickname = totalData[i].nickname;

      const rows = await userModel.checkDuplicateUser(playerId, nickname);

      if (rows.length === 0) {
        await userModel.insertUser(playerId, nickname);
        console.log(`추가된 : playid : ${playerId}, nickname : ${nickname}`);
      }
      if (totalData.length === 0) {
        console.log('추가할 데이터가 없습니다');
      }
    }
    return totalData;
  } catch (e) {
    console.log('데이터를 가져오는 중 에러 발생:', error);
  }
};

const userRankingHistorySync = {
  rankingsyncData,
};

module.exports = userRankingHistorySync;
