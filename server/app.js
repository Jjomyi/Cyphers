const express = require('express');
const cors = require('cors');
const app = express();
const con = require('./db/connect');
const PORT = process.env.PORT || 8080;
const userRoutes = require('./routes/userRoutes');

// CORS 사용
app.use(cors());

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`서버 실행 포트 : ${PORT}`);
});
