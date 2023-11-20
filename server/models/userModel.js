const con = require('../db/connect');

const getuserName = (name) => {
  return new Promise((resolve, reject) => {
    const selectQuery = `
      SELECT *
      FROM Cyphers.users
      WHERE name = "${name}"
      UNION
      SELECT *
      FROM Cyphers.users
      WHERE playid IN (
          SELECT playid
          FROM Cyphers.users
          WHERE name = "${name}"
      );
  `;
    con.query(selectQuery, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

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
  getuserName,
  checkDuplicateUser,
  insertUser,
};

module.exports = userModel;
