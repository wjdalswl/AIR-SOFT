import styled from 'styled-components';
import React, { useState } from 'react';

const Container = styled.div`
  padding-top: 60px;
`;

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 간단한 예제로, 실제로는 서버와 통신하여 인증을 수행해야 합니다.
    // 여기서는 입력한 사용자명과 비밀번호를 콘솔에 출력하는 예제 코드입니다.
    console.log('Username:', username);
    console.log('Password:', password);

    // 실제로는 서버와 통신하여 사용자를 인증하고, 인증이 성공하면 onLogin 콜백을 호출합니다.
    // onLogin(username, password);
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
        <button onClick={handleLogin}>Login</button>
      </div>
    </Container>
  );
}

export default Login;
