const request = require('request');
const userModel = require('../models/userModel');

const APIKEY = process.env.API_KEY;

const MAX_LIMIT = 1000;

const fetchData = (offset) => {
  return new Promise((resolve, reject) => {
    const apiRequestUserinfo = {
      method: 'GET',
      url: `https://api.neople.co.kr/cy/ranking/ratingpoint?offset=${offset}&limit=${MAX_LIMIT}&apikey=${APIKEY}`,
    };

    request(apiRequestUserinfo, (err, response) => {
      if (err) {
        reject(err);
      } else {
        const userinfo = JSON.parse(response.body);
        resolve(userinfo);
      }
    });
  });
};

const processUserData = async () => {
  try {
    let offset = 0;
    const totalData = [];

    while (true) {
      const userinfo = await fetchData(offset);
      totalData.push(...userinfo.rows);

      // 다음 페이지 데이터
      if (userinfo.rows.length !== MAX_LIMIT) {
        break;
      }
      offset += MAX_LIMIT;
    }

    console.log(
      '모든 데이터를 가져왔습니다. 총 데이터 개수:',
      totalData.length
    );
    for (let a = 0; a < totalData.length; a++) {
      let playerId = totalData[a].playerId;
      let nickname = totalData[a].nickname;

      const rows = await userModel.checkDuplicateUser(playerId, nickname);

      if (rows.length === 0) {
        await userModel.insertUser(playerId, nickname);
        console.log(`추가된 : playid : ${playerId},nickname : ${nickname}`);
      } else {
        console.log(`playID는 이미 존재합니다 : ${playerId}`);
      }
    }
    if (totalData.length === 0) {
      console.log('추가할 데이터가 없습니다.');
    }
  } catch (error) {
    console.error('데이터를 가져오는 중 에러 발생:', error);
  }
};

const userService = {
  processUserData,
};

module.exports = userService;
