import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [name,setName] = useState('')
  const [result,setResult] = useState([])
  const [newdata,setNewdata] = useState('')

  const onChange = (e) => {
    // console.log(e.target.value)
    setName(e.target.value)
  }
  const onClick = (e) => {
      const URL = 'http://localhost:8080/userinfo'
      axios.get(URL)
        .then(res => {
          let found = false
          const newResult = []
          // console.log(res.data[0].createdDate)
          // console.log(res.data[0].playid)
          for(let a = 0; a<res.data.length; a++) {
            if(name === res.data[a].playid) {
              console.log(res.data[a].name)
              console.log(res.data[a].name2)
              newResult.push(res.data[a].name)
              newResult.push(res.data[a].name2)
              // setResult(res.data[a].name)
              // setResult(res.data[a].name2)
              // const mysqlDate = res.data[a].createdDate
              // const dataobj = new Date(mysqlDate)
              // const year = dataobj.getFullYear()
              // const month = String(dataobj.getMonth() + 1).padStart(2,'0')
              // const day = String(dataobj.getDate()).padStart(2,'0')
              // const formattedDate = `${year}-${month}-${day}`
              // console.log(formattedDate)
              // setNewdata(formattedDate)

              found = true
              break;
            }
          }
          if(!found) {
            alert(`${name}은 없는 닉네임이야`)
          }
          setResult(newResult)
        }
        )
  }
  const resetonClick = () => {
    console.log('초기화')
    setName('')
    setResult([])
    setNewdata('')
  }
  // 클릭을 했을때 
  // userinfo 데이터베이스 name에서
  // name === api 닉네임이 같을때
  // 출력해준다
  //수집일 출력하기 9월4일 아직 하는중

  return (
    <>
    <div>별놈돋보기</div>
    
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
        <button onClick={resetonClick}>초기화</button>
        <div>닉네임</div>
        {/* <div>{result.map((result) => (
          <li key = {result.playid}>{result.name}</li>
        ))}</div> */}
        {/* <div>{result}</div> */}
        {result.map((name,index) => (
          <div key = {index}>{name}</div>
        ))}
        <div>수집일</div>
        <div>{newdata}</div>
      </div>
    </>
  );
}

export default App;
