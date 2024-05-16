import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Userplayinfo = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState([]);
  const totalRecords = calculateTotalRecords({
    winCount: result.records?.[0].winCount,
    stopCount: result.records?.[0].stopCount,
    loseCount: result.records?.[0].loseCount,
  });

  const onChange = (e) => {
    setName(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  const playid = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/cy/players/matches?nickname=${name}`
      );
      console.log(response.data);
      setResult(response.data);
    } catch (error) {
      console.log('데이터 가져오는 중 에러 발생 : ', error);
    }
  };

  const onClick = () => {
    playid();
  };

  return (
    <>
      <div>공식전 랭킹</div>
      <div>유저 정보 검색 하는 곳</div>
      <input
        type="text"
        value={name}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={onClick}>검색</button>
      <div>결과창</div>
      {result.records && result.records.length > 0 && (
        <div>
          <div>닉네임 : {result.nickname}</div>
          <div>급수 : {result.grade}</div>
          <div>클랜 : {result.clanName}</div>
          <div>랭크 : {result.tierName}</div>
          <span>티어점수 : {result.ratingPoint}</span>
          <span>최고 티어점수 :{result.maxRatingPoint}</span>
          <div>
            <span>
              {`승률: ${calculateWinRate({
                totalRecords,
                winCount: result.records[0].winCount,
                stopCount: result.records[0].stopCount,
              })}% `}
            </span>
            <span>{totalRecords}전</span>
            <span>{result.records[0].winCount}승</span>
            <span>{result.records[0].loseCount}패</span>
            <span>{result.records[0].stopCount}중단</span>
          </div>
          <ul>
            {/* console.log(response.data.matches.rows[0].playInfo.result); */}
            {result.matches.rows.map((match, index) => (
              <li key={index}>
                최근게임 : {match.playInfo.result}
                {/* 매치에 관련된 다른 정보도 표시할 수 있습니다. */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

const calculateTotalRecords = ({ winCount, loseCount, stopCount }) =>
  winCount + loseCount + stopCount;

const calculateWinRate = ({ totalRecords, winCount, stopCount }) => {
  const resultotalRecords = totalRecords - stopCount;
  const winRate = winCount / resultotalRecords;

  return Math.round(winRate * 100);
};

export default Userplayinfo;
