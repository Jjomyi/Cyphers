// Server 작성
const express = require('express');


const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
// const db = require('../src/lib/db.js')

// const url = 'https://api.neople.co.kr/cy/ranking/ratingpoint?playerId=<playerId>&offset=<offset>&limit=<limit>&apikey=4wU9FwRrSicvhGQV58FiKDPaVyL2gFOV'



            // 통합정보
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://api.neople.co.kr/cy/ranking/ratingpoint?offset=<offset>&limit=<limit>&apikey=4wU9FwRrSicvhGQV58FiKDPaVyL2gFOV',
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  app.get('/userinfo',(req,res) => {
    console.log(response.body)
    res.send(response.body)
  })
});




// const nicknamea = () => {
//   const [name,setName] = useState('')

//   var request = require('request');
//   var options = {
//     'method': 'GET',
//     'url': `https://api.neople.co.kr/cy/players?nickname=${name}&wordType=<wordType>&apikey=4wU9FwRrSicvhGQV58FiKDPaVyL2gFOV`,
//     'headers': {
//     }
//   };
//   request(options, function (error, response) {
//     if (error) throw new Error(error);
//     app.get('/',function(req,res) {
//       res.send(response.body)
//     })
//     console.log(response.body);
//   });
// }
// nicknamea()
          // 닉네임 검색



// CORS 사용
app.use(cors());

// users
// router.get('/users', function(req,res,next) {
//   db.query()
// })
// const mysql = require('mysql');
// const { request } = require('http');

// const options = {
//   uri: "https://api.neople.co.kr/cy/ranking/ratingpoint?playerId=<playerId>&offset=<offset>&limit=<limit>&apikey=4wU9FwRrSicvhGQV58FiKDPaVyL2gFOV",
// };


// app.get('/userinfo' , function(req,res) {
//   // console.log('qwe')
//   request(options, function(err,response,body){
//     console.log(response)
//     res.json({})
//   })
// })


// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'qkrqudwls',
//   database: 'Cyphers'
// })

// con.connect(function(err) {
//   if(err) throw err
//   console.log('Connected')
  
 
//   // const sql = "Select * from Cyphers.users"
//   // con.query(sql, function (err, result, fields) {
//   //   if(err) throw err
//   //   console.log(result[0].name)
//   // })
// })

// const options = {
//   uri: "https://api.neople.co.kr/cy/ranking/ratingpoint?playerId=<playerId>&offset=<offset>&limit=<limit>&apikey=4wU9FwRrSicvhGQV58FiKDPaVyL2gFOV",
// };
// request(options,function(err,response,body){
//   console.log(response)
// })


// app.get('/', (req,res) => {
//   const sql = "Select * from Cyphers.users"
//   con.query(sql, function (err, result, fileds) {
//     if(err) throw err
//     res.send(result)
//   })
// })


 
  

// 서버가 잘 동작하고 있는지 확인
server.listen(8080, ()=>{
  console.log('server is running on 8080');
});


