const con = require('../db/connect');

const getuserPlayid = (name) => {
  return new Promise((resolve, reject) => {
    const playIdSelectQuery = `
    SELECT playid
    FROM Cyphers.users
    WHERE name = '${name}'
    `;
    con.query(playIdSelectQuery, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const userModel = {
  getuserPlayid,
};

module.exports = userModel;
