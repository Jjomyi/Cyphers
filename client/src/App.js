import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [name,setName] = useState('')
  const [result,setResult] = useState('')
  const [resultt,setResultt] = useState('')

  const onChange = (e) => {
    // console.log(e.target.value)
    setName(e.target.value)
  }
  const onClick = (e) => {
      const URL = 'http://localhost:8080/userinfo'
      axios.get(URL)
        .then(res => {
          let found = false
          for(let a = 0; a<res.data.length; a++) {
            if(name === res.data[a].name) {
              setResult(res.data[a].name)
              setResultt(res.data[a].playId)
              found = true
              break;
            }
          }
          if(!found) {
            alert(`${name}은 없는 닉네임이야`)
          }
        }
        )
  }
  // 클릭을 했을때 
  // userinfo 데이터베이스 name에서
  // name === api 닉네임이 같을때
  // 출력해준다
  

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
        <div>{result},{resultt}</div>
      </div>
    </>
  );
}

export default App;
