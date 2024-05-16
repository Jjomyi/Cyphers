const axios = require('axios');
const userModel = require('../../models/userModel');

const APIKEY = process.env.API_KEY;

const MAXLIMIT = 1000;

const userRankingHistorySync = async (offset) => {
  try {
    const response = await axios.get(
      `https://api.neople.co.kr/cy/ranking/ratingpoint`,
      {
        params: {
          offset: offset,
          limit: MAXLIMIT,
          apikey: APIKEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const featch = async () => {
  try {
    let offset = 0;
    const totalData = [];

    while (true) {
      const userinfo = await userRankingHistorySync(offset);
      totalData.push(...userinfo.rows);
      if (userinfo.rows.length !== MAXLIMIT) {
        break;
      }
      offset += MAXLIMIT;
    }
    console.log(
      '모든 데이터를 가져왔습니다. 총 데이터 개수:',
      totalData.length
    );
    return totalData;
  } catch (e) {
    console.log(e);
  }
};

const userHistorySync = {
  featch,
};

module.exports = userHistorySync;
