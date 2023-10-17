import { useState } from 'react';
import axios from 'axios'
import dayjs from 'dayjs'
import './App.css';

function App() {
  const [name,setName] = useState('')
  const [result,setResult] = useState([])

  const onChange = (e) => {
    setName(e.target.value)
  }

  const formatDate = (date) => {
    return dayjs(date).format('YYYY-MM-DD')
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/username?name=${name}`)
      if(response.data && response.data.length > 0) {
        const formattedData = response.data.map(item => ({
          ...item,
          createdDate: formatDate(item.createdDate)
        }))
        setResult(formattedData);
        setName('')
      } else {
        alert(`${name}은 없는 닉네임입니다.`)
      }
    }
    catch(error) {
      console.log('데이터를 가져오는 중 에러 발생 : ',error)
    }
  }
  const onClick = () => {
    fetchData()
  }
  const handleKeyPress = e => {
    if(e.key === 'Enter') {
      onClick()
    }
  }
  const resetonClick = () => {
    setName('')
    setResult([])
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
        onKeyPress={handleKeyPress}
      />
      <button onClick={onClick}>검색</button>
      <button onClick={resetonClick}>초기화</button>
      <div>닉네임</div>
      <div>{result.map((item => 
      <div key={item.id}>
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

