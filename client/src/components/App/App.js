import { Routes, Route, Link } from 'react-router-dom';
import Userhistory from '../Main/Userhistory';
import Main from '../Main/Main';
import styled from 'styled-components';
import './App.css';
import Userplayinfo from '../Main/UserPlayInfo';

const HeaderWrapper = styled.header`
  /* display: flex; */
  /* justify-content: center; */
  background-color: burlywood;
  padding: 16px;
`;
const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: bold;
  padding: 10px;
  &:hover {
    text-decoration: underline;
  }
`;
function App() {
  return (
    <>
      <HeaderWrapper>
        <StyledLink to="/">사이퍼즈</StyledLink>
        <StyledLink to="/history/nicknameHistory">닉변검색</StyledLink>
        <StyledLink to="/user/userinfo">유저검색</StyledLink>
      </HeaderWrapper>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/history/nicknameHistory" element={<Userhistory />} />
        <Route path="/user/userinfo" element={<Userplayinfo />} />
      </Routes>
    </>
  );
}
export default App;
