// Server 작성
require('dotenv').config({path:"/Users/jjomyi/Desktop/Cyphers/client/.env"});
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
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
//통합랭킹 조회 api
con.connect((err) => {
  if(err) {
    console.log(err)
  }
  console.log('DB연결 Connected')

const MAX_LIMIT = 1000; // 최대 limit 값
const totalData = []; // 데이터를 저장할 배열

// function fetchData(offset) {
//   let request = require('request')
//   const apiRequestUserinfo = {
//     method: 'GET',
//     url: `https://api.neople.co.kr/cy/ranking/ratingpoint?offset=${offset}&limit=${MAX_LIMIT}&apikey=${APIKEY}`,
//   };

//   request(apiRequestUserinfo, (err, response) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     const userinfo = JSON.parse(response.body);

//     // 데이터를 배열에 추가
//     totalData.push(...userinfo.rows);
//     // 다음 페이지 데이터 가져오기
//     if (userinfo.rows.length === MAX_LIMIT) {
//       fetchData(offset + MAX_LIMIT);
//     } else {

//       // 모든 데이터를 가져왔을 때 DB에 저장하거나 다른 처리를 수행할 수 있습니다.
//       // totalData 배열에는 모든 데이터가 저장됩니다.
//       console.log('모든 데이터를 가져왔습니다.');
//       // console.log('총 데이터 개수:', totalData.length);
//       for(let a = 0; a<totalData.length; a++) {
//         const playerId = totalData[a].playerId
//         const nickname = totalData[a].nickname
//         // console.log(playerId)
        
//         // app.get('/res', (req, res) => {
//         //   // totalData 배열의 모든 nickname 값을 클라이언트에게 반환
//         //   const nicknames = totalData.map((data) => data.nickname);
//         //   res.send(nicknames);
//         // });
        
//         // const checkDuplicateQuery = `SELECT * FROM Cyphers.testusers WHERE playid = '${playerId}' AND name = '${nickname}`;
//         const checkDuplicateQuery = `SELECT * FROM Cyphers.testusers2 WHERE playid = '${playerId}' AND name = '${nickname}'`;
//         // const checkDuplicateQuery = `SELECT * FROM Cyphers.testusers2 WHERE playid = '${playerId}'`;


//         con.query(checkDuplicateQuery,(err,rows) => {
//           if(err) {
//             console.log(err)
//           } else {
//             if(rows.length === 0) {
//               const insertQuery = `INSERT INTO Cyphers.testusers2 (playid, name, createdDate) VALUES ('${playerId}', '${nickname}', NOW())`;

//               con.query(insertQuery,(err,result) => {
//                 if(err) {
//                   console.log(err)
//                 }
//                 console.log(`추가된 : playid ${playerId},nickname ${nickname}`,result)
//               })
//             } else {
//               console.log(`playid '${playerId}'는 이미 존재합니다.`);
//             }
//           }
//         })







//         // const sql = `INSERT into Cyphers.testusers(playid,name,createdDate) VALUES('${playerId}','${nickname}',now())`
//         // con.query(sql,(err,result) => {
//           // if(err) {
//           // console.log(err)
//           // } 
//           // console.log(result)
//         // })
//       }
//       // 여기에서 DB에 저장하거나 다른 작업을 수행할 수 있습니다.
//     }
//   });
// }

// // fetchData 함수를 호출하여 데이터 가져오기 시작
// fetchData(0);






  // const MAX_LIMIT = 1000;
  // const offset = 0;
  // const totalData = [];

  // let request = require('request');
  // const apiRequestUserinfo = {
  //   'method' : 'GET',
  //   'url': `https://api.neople.co.kr/cy/ranking/ratingpoint?offset=${offset}&limit=${MAX_LIMIT}&apikey=${APIKEY}`
  // }
  // request(apiRequestUserinfo,(err,response) => {
  //   if(err) {
  //     console.log(err)
  //   }
  //   let userinfo = JSON.parse(response.body)
    
    
  // })
})



app.get('/userinfo',(req,res) => {
  const selectsql = 'select * from Cyphers.testusers2'
  con.query(selectsql,(err,result) => {
    if(err) {
      console.log(err)
    }
    res.send(result)
  })
})




























// 서버가 잘 동작하고 있는지 확인
server.listen(8080, ()=>{
  console.log('server is running on 8080');
});


