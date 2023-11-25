import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StyledLink, SearchButton } from '../MainPages/ TicketReservation';

const Container = styled.div`
  padding-top: 60px;
`;

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

function Login() {
  const loginhistory = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    // 비밀번호 확인
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      alert('비밀번호는 6자리 이상, 영문자, 숫자, 특수문자를 포함해야 합니다.');
      return;
    }

    console.log('Username:', username);
    console.log('Password:', password);

    // 실제로는 서버와 통신하여 사용자를 인증하고, 인증이 성공하면 onLogin 콜백을 호출합니다.
    // onLogin(username, password);
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Server response:', data);

        const token = data.token;
        localStorage.setItem('token', token);

        // 로그인 정보 비교 완료되면 로그인 페이지로 이동
        loginhistory.push('/');
      })
      .catch((error) => {
        console.error('Error sending data to server:', error);
      });
  };

  const handleRetister = () => {
    loginhistory.push({
      pathname: '/RegisterForm',
    });
  };

  return (
    <Container>
      <div>
        <h2>로그인</h2>
        <div>
          <label>아이디</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <StyledLink to={'/'}>
          <SearchButton onClick={handleLogin}>로그인</SearchButton>
        </StyledLink>
        <StyledLink to={'/RegisterForm'}>
          <SearchButton onClick={handleRetister}>회원가입</SearchButton>
        </StyledLink>
      </div>
    </Container>
  );
}

export default Login;
