import { useState } from 'react';
import {Router,Link} from 'react-router-dom';
import axios from 'axios'
import dayjs from 'dayjs'
import styled from 'styled-components'
import './App.css';

//스타일드 컴포넌트
const HeaderWrapper = styled.header`
    display: flex;
    justify-content: center;
    background-color: #007bff;
    color: #fff;
    padding: 16px;
  `
const Logo = styled.div`
font-size: 24px;
font-weight: bold;
margin-right: 20px;
`;
const Navigation = styled.nav`
  display: flex;
  align-items: center;
`;

const NavItem = styled.a`
  color: #fff;
  text-decoration: none;
  margin-right: 20px;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;
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
    <HeaderWrapper>
      <NavItem><Link to = "/">홈</Link></NavItem>
      <NavItem><Link to = "/324324">1</Link></NavItem>
      <NavItem><Link to = "/3515">2</Link></NavItem>
      <NavItem href='/'>별놈돋보기</NavItem>
      <Navigation>
        <NavItem href='/'>홈</NavItem>
        <NavItem href='/nickname'>닉변이력</NavItem>
      </Navigation>
    </HeaderWrapper>
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

