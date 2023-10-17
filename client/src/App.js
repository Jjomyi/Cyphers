import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [name,setName] = useState('')
  const [result,setResult] = useState([])

  const onChange = (e) => {
    setName(e.target.value)
  }

  // 1. 개선점 => name을 api에 넘겨줘야함 (query params를 써서)
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/username?name=${name}`)
      setResult(response.data)
    }
    catch(error) {
      console.log('데이터를 가져오는 중 에러 발생 : ',error)
    }
  }
  const onClick = () => {
    fetchData()
  }
  return(
    <>
    <div>닉변이력 검색기</div>
    <div>
      <div>조회결과</div>
      <input
        type="text"
        placeholder='예전 닉 검색 가능'
        value={name}
        onChange={onChange}
      />
      <button onClick={onClick}>검색</button>
      <div>닉네임</div>
      <div>{result.map((item => 
      <div key={item.playid}>
        <div>{item.name}</div>
        <div>{item.createdDate}</div>
      </div>
      ))}
      </div>
    </div>
    </>
  )
}

export default App

