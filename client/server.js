// Server 작성
require('dotenv').config({path:"/Users/jjomyi/Desktop/Cyphers/client/.env"});
const express = require('express');
const cors = require('cors');
const app = express();
const request = require('request');
const server = require('http').createServer(app);
const cron = require('node-cron')
// CORS 사용
app.use(cors());
// mysql 연동
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PW = process.env.DB_PW
const DB_NAME = process.env.DB_NAME
const APIKEY = process.env.API_KEY

const mysql = require('mysql');
const con = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PW,
  database: DB_NAME
})
con.connect((err) => {
    if(err) {
      console.log(err)
    }
    console.log('DB연결 Connected')
});

 const MAX_LIMIT = 1000;
 const fetchData = (offset) => {
    return new Promise((resolve, reject) => {
        const apiRequestUserinfo = {
            method: 'GET',
            url: `https://api.neople.co.kr/cy/ranking/ratingpoint?offset=${offset}&limit=${MAX_LIMIT}&apikey=${APIKEY}`,
        };

        request(apiRequestUserinfo, (err,response) => {
            if(err) {
                reject(err)
            } else {
                const userinfo = JSON.parse(response.body)
                resolve(userinfo)
            }
        })
    })
 }
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

        console.log('모든 데이터를 가져왔습니다. 총 데이터 개수:', totalData.length);
        for (let a = 0; a < totalData.length; a++) {
            let playerId = totalData[a].playerId;
            let nickname = totalData[a].nickname;

            const checkDuplicateQuery = `SELECT * FROM Cyphers.users WHERE playid = '${playerId}' AND name = '${nickname}'`;

            con.query(checkDuplicateQuery,(err,rows) => {
                if(err) {
                    console.log(err)
                } else {
                    if(rows.length === 0) {
                        const insertQuery = `INSERT INTO Cyphers.users (playid, name, createdDate) VALUES ('${playerId}', '${nickname}', NOW())`;
                        
                        con.query(insertQuery,(err,result) => {
                            if(err) {
                                console.log(err)
                            }
                            console.log(`추가된 : playid : ${playerId},nickname : ${nickname}`)
                        })
                    } else {
                        console.log(`playID는 이미 존재합니다 : ${playerId}`)
                    }
                }
            })
        }
        if (totalData.length === 0) {
            console.log('추가할 데이터가 없습니다.');
        }
    } catch (error) {
        console.error('데이터를 가져오는 중 에러 발생:', error);
    }
};

cron.schedule('0 11 * * *', () => {
    console.log('매일 오전 11시에 데이터를 업데이트합니다.')
    processUserData()
ㅍ})

app.get('/api/username',(req,res) => {
    const {name} = req.query
        const selectQuery =  `
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
    con.query(selectQuery,(err,result) => {
        if(err) {
            console.log(err)
        }
        res.send(result)
    })
})

server.listen(8080, () => {
    console.log('server is running on 8080');
});

