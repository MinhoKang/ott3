import React from 'react';
import styled from 'styled-components';

const LoginPage = () => {
  return (
    <Container>
      <div>
        <img
          width={200}
          src="https://blog.kakaocdn.net/dn/c5SZ6P/btrbdZ4O6xp/hMYR98lkkoZqpNaHttOAY0/img.jpg"
          alt=""
        />
      </div>
      <LoginBtn>로그인</LoginBtn>
    </Container>
  );
};

export default LoginPage;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const LoginBtn = styled.button`
  width: 200px;
  padding: 10px;
  background-color: #22bdff;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #189adb;
  }
`;
