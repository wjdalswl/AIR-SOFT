import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import {
  StyledLink,
  SearchButton,
} from '../MainPages/InTicketReservation/ TicketReservation';
import { saveToken } from '../TokenManagement/token';
import setAuthorizationToken from '../TokenManagement/setAuthorizationToken';
import {
  Container,
  Title,
} from '../MainPages/InTicketReservation/FlightSelect';
import { Form, FormGroup, Label, Input } from './RegisterForm';

const SubmitDiv = styled.div`
  padding-left: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

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

        const receivedToken = data.token;
        saveToken(receivedToken);
        setAuthorizationToken(receivedToken);

        // 로그인 정보 비교 완료되면 메인(홈) 페이지로 이동
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
      <Form>
        <FormGroup>
          <Label htmlFor="username">아이디</Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <SubmitDiv>
          <StyledLink to={'/'}>
            <SearchButton onClick={handleLogin}>로그인</SearchButton>
          </StyledLink>
          <StyledLink to={'/RegisterForm'}>
            <SearchButton onClick={handleRetister}>회원가입</SearchButton>
          </StyledLink>
        </SubmitDiv>
      </Form>
      <StyledLink to={'/ManagerPage'}>
        <SearchButton onClick={handleRetister}>관리자 로그인</SearchButton>
      </StyledLink>
    </Container>
  );
}

export default Login;
