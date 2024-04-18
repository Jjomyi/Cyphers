import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Userplayinfo = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState([]);

  const onChange = (e) => {
    setName(e.target.value);
  };

  const playid = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/userinfo?name=${name}`
      );
      setResult(response.data);
      // const ad = response.data.map((item) => {
      //   return {
      //     clanName: item.clanName,
      //     grade: item.grade,
      //   };
      // });
      // const a =
      //   response.data.records[0].loseCount +
      //   response.data.records[0].stopCount +
      //   response.data.records[0].winCount;
      console.log(response.data);
      // response.data.push(a);
      // console.log(response.data.records[0].loseCount);
      // console.log(response.data.records[0].stopCount);
      // console.log(response.data.records[0].winCount);
    } catch (error) {
      console.log('데이터 가져오는 중 에러 발생 : ', error);
    }
  };

  const onClick = () => {
    playid();
  };

  return (
    <>
      <div>정보</div>
      <input type="text" value={name} onChange={onChange} />
      <button onClick={onClick}>검색</button>
      <div>결과창 -----</div>
      <div> 닉네임 : {result.nickname}</div>
      <div> 급수 : {result.grade}</div>
      <div> 클랜 : {result.clanName}</div>
      <div> 랭크 : {result.tierName}</div>
      <div>
        {' '}
        티어점수 : {result.ratingPoint} 최고 티어점수 : {result.maxRatingPoint}
      </div>
      {/* {result.records && result.records.length > 0 && (
        <div>
          합계 : {result.sum}
          패: {result.records[0].loseCount}
          중단: {result.records[0].stopCount}
          승: {result.records[0].winCount}
        </div>
      )} */}
    </>
  );
};

export default Userplayinfo;
