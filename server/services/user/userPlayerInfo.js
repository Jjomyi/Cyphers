const request = require('request');
const userModel = require('../../models/userModel');
const APIKEY = process.env.API_KEY;

const userMatchesAPI = async (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await userModel.getuserPlayid(name);
      if (result.length === 0) {
        throw new Error('Playid가 없는 유저 : ' + name);
      }
      const playid = result[0].playid;
      // API 호출
      const userinfoMatchAPI = {
        method: 'GET',
        url: `https://api.neople.co.kr/cy/players/${playid}/matches`,
        qs: {
          // gameTypeId: 'normal', 기본값은 rating
          // startDate,
          // endDate,
          limit: 20,
          apikey: APIKEY,
        },
      };
      request(userinfoMatchAPI, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const playinfo = JSON.parse(response.body);
          resolve(playinfo);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const userPlayerInfo = {
  userMatchesAPI,
};

module.exports = userPlayerInfo;
