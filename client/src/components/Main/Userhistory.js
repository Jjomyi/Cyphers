import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const Userhistory = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState([]);

  const onChange = (e) => {
    setName(e.target.value);
  };

  const formatDate = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/nicknameHistory?nickname=${name}`
      );
      if (response.data && response.data.length > 0) {
        const formattedData = response.data
          .map((item) => ({
            ...item,
            createdDate: formatDate(item.createdDate),
          }))
          .sort((a, b) =>
            dayjs(a.createdDate).isBefore(dayjs(b.createdDate)) ? 1 : -1
          );
        console.log(response.data);
        setResult(formattedData);
        setName('');
      } else {
        alert(`${name}은 없는 닉네임입니다.`);
      }
    } catch (error) {
      console.log('데이터를 가져오는 중 에러 발생 : ', error);
    }
  };
  const onClick = () => {
    fetchData();
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };
  const resetonClick = () => {
    setName('');
    setResult([]);
  };
  return (
    <>
      <h1>조회결과</h1>
      <input
        type="text"
        placeholder="예전 닉 검색 가능"
        value={name}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={onClick}>검색</button>
      <button onClick={resetonClick}>초기화</button>
      {
        <>
          <div>
            <span>수집일</span>
            <span>닉네임</span>
          </div>
          {result.map((item) => (
            <div key={item.id}>
              <span>{item.createdDate}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </>
      }
    </>
  );
};

export default Userhistory;
