import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [name,setName] = useState('')
  const [result,setResult] = useState('')

  const onChange = (e) => {
    setName(e.target.value)
  }

  // const onClick = () => {
  //   const URL = `https://api.neople.co.kr/cy/players?nickname=${name}&wordType=<wordType>&apikey=4wU9FwRrSicvhGQV58FiKDPaVyL2gFOV`
  //     axios.get(URL)
  //       .then(res => {
  //         const usernickname = res.data.rows[0]
  //         setResult(usernickname.nickname)
  //     }
  //   )
  // }
  // axios.get('http://localhost:8080/')
  // .then(res => setResult(res.data[0].id))

  // const onClick = () => {
  //   const URL = 'http://localhost:8080/userinfo'
  //     axios.get(URL)
        
  // }

  return (
    <>
    <div>닉변이력 검색기</div>
      <div>
        <div>조회결과</div>
        <input 
        type = "text"
        placeholder='예전 닉 검색 가능'
        value = {name}
        onChange={onChange}
        />
        <button onClick={onClick}> 검색 </button>
        <div>수집일 : 닉변일</div>
        <div>{result}</div>
      </div>
    </>
  );
}

export default App;
