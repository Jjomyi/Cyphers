// Server 작성
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);

// CORS 사용
app.use(cors());

const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qkrqudwls',
  database: 'Cyphers'
})

// 1. 사이퍼즈 통합랭킹 api 호출
// 2. 통합랭킹 API를 DB에 넣어보기
// 1. 완료 -> 2. 진행중

// con.connect((err) => {
//   if(err) console.log(err)
//   console.log('Connected')

//   var request = require('request');
//   var options = {
//   'method': 'GET',
//   'url': 'https://api.neople.co.kr/cy/ranking/ratingpoint?offset=1001&limit=1000&apikey=4wU9FwRrSicvhGQV58FiKDPaVyL2gFOV'
//   }
//   request(options,(err,response) => {
//     if(err) console.log(err)
//     let data = JSON.parse(response.body)
//     app.get('/userinfo',(req,res) => {
//       for(let a = 0; a<1000; a++) {
//         let playerId = data.rows[a].playerId
//         let nickname = data.rows[a].nickname
//         const sql = `INSERT into Cyphers.users(playid,name) VALUES('${playerId}','${nickname}')`
//         console.log(sql)
//         console.log(data.rows[a].playerId)
//         console.log(data.rows[a].nickname)
//         con.query(sql,(err,result,fields) => {
//           if(err) console.log(err)
//           console.log(result)
//         })
//       }
//       res.send(response.body)
      // res.json(nicknames)
      // console.log(sql)
      // con.query(sql,(err,result,fields) => {
      //   if(err) console.log(err)
      //   console.log(result)
  //     })
  //   })
  // })

  // app.get('/userinfo',(req,res) => {

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

    const sql = "SELECT * FROM Cyphers.users;"
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


