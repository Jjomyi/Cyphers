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
// con.connect((err) => {
//   if(err) {
//     console.log(err)
//   }
//     console.log('DB연결 Connected')
//   let request = require('request')
//   let apiRequestRanking = {
//     'method' : 'GET',
//     'url': `https://api.neople.co.kr/cy/ranking/ratingpoint?offset=0&limit=1000&apikey=${APIKEY}`
//   }
// })




























// con.connect((err) => {
//   if(err) {console.log(err)}
//   console.log('DB 연결 Connected')

//   let request = require('request')
//   let options = {
//     'method': 'GET',
//     'url': `https://api.neople.co.kr/cy/ranking/ratingpoint?offset=0&limit=1000&apikey=${APIKEY}`
//   }
//   request(options,(err,response) => {
//     if(err) {console.log(err)}
//      let userinfo = JSON.parse(response.body)
//      for(let a = 0; a<userinfo.length; a++) {
//       const playerId = userinfo.rows[a].playerId
//       const nickname = userinfo.rows[a].nickname
//       const sqlSelect  = `SELECT * FROM Cyphers.testusers WHERE playid = '${playerId}'`

//       con.query(sqlSelect,(selectErr,rows) => {
//         if(selectErr) {console.log('SELECT 쿼리 오류',selectErr)}
//         else if (rows.length === 0) {
//           const sqlInsert = `INSERT INTO Cyphers.testusers (playid, name) VALUES ('${playerId}', '${nickname}')`;

//           con.query(sqlInsert,(insertErr,insertResult) => {
//             if(insertErr) {
//               console.error('INSERT 쿼리 오류:', insertErr);
//             } else {
//               console.log(`새로운 레코드 추가: ${playerId}, ${nickname}`);
//             }
//           })
//         }
//       })
//      }
//   })

// })







//   request(options,(err,response) => {
//     if(err) {console.log(err)}
//       let userinfo = JSON.parse(response.body)
//         app.get('/userinfo',(req,res) => {
//           for(let a = 0; a<)
//           if()
//         })
//   })
// })







//   request(options,(err,response) => {
//     if(err) console.log(err)
//     let data = JSON.parse(response.body)
//     app.get('/userinfo',(req,res) => {
//       for(let a = 0; a<1000; a++) {
//         if(data.rows[a].playerId === data.rows[a].playerId) {
//           const sql = `INSERT into Cyphers.testusers(playid,name) VALUES('${playerId}','${nickname}')`

//         }
//         // let playerId = data.rows[a].playerId
//         // let nickname = data.rows[a].nickname
//         // const sql = `INSERT into Cyphers.testusers(playid,name) VALUES('${playerId}','${nickname}')`
//         // console.log(sql)
//         // console.log(data.rows[a].playerId)
//         // console.log(data.rows[a].nickname)
//         con.query(sql,(err,result,fields) => {
//           if(err) console.log(err)
//           console.log(result)
//         })
//       }
//       res.send(response.body)
//       res.json(nicknames)
//       console.log(sql)
//       con.query(sql,(err,result,fields) => {
//         if(err) console.log(err)
//         console.log(result)
//       })
//     })
//   })
// })
  


 

// request(options,(err,response) => {
//   if(err) throw err
//   let data = JSON.parse(response.body)
//   app.get('/userinfo',(req,res) => {
//     let nicknames = [];
//     for(let a = 0; a<5; a++) {
//       nicknames.push(data.rows[a].nickname)
//       console.log(data.rows[a].nickname)
//     }
//     res.json(nicknames)
//   })
// })




  app.get('/userinfo',(req,res) => {

    const sql = "SELECT A.*, B.name AS name2 FROM Cyphers.testusers A JOIN Cyphers.testusers B ON A.playid = B.playid WHERE A.playid = '9b697894cacd8364dbd85251abdab2f2';"
    con.query(sql,(err,result,fileds) => {
      if(err) console.log(err)
    // console.log(result)
    res.send(result)
  }) 
  })



// 서버가 잘 동작하고 있는지 확인
server.listen(8080, ()=>{
  console.log('server is running on 8080');
});


