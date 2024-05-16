const con = require('../db/connect');

const checkDuplicateUser = (playerId, nickname) => {
  return new Promise((resolve, reject) => {
    const checkDuplicateQuery = `SELECT * FROM Cyphers.users WHERE playid = '${playerId}' AND name = '${nickname}'`;

    con.query(checkDuplicateQuery, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const insertUser = (playerId, nickname) => {
  return new Promise((resolve, reject) => {
    const insertQuery = `INSERT INTO Cyphers.users (playid, name, createdDate) VALUES ('${playerId}', '${nickname}', NOW())`;

    con.query(insertQuery, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const userModel = {
  checkDuplicateUser,
  insertUser,
};

module.exports = userModel;
