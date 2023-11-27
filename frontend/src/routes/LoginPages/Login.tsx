import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  StyledLink,
  SearchButton,
} from '../MainPages/InTicketReservation/ TicketReservation';
import { saveToken } from '../TokenManagement/token';
import setAuthorizationToken from '../TokenManagement/setAuthorizationToken';
import { Container } from '../MainPages/InTicketReservation/FlightSelect';
import { Form, FormGroup, Label, Input } from './RegisterForm';

const SubmitDiv = styled.div`
  padding-left: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const LoginDiv = styled.div`
  margin-top: 10px;
  margin-left: auto;
  margin-right: 25px;
`;

function Login() {
  const loginhistory = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!username || !password) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    console.log('Username:', username);
    console.log('Password:', password);

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

        loginhistory.push('/TicketReservation');
      })
      .catch((error) => {
        console.error('Error sending data to server:', error);
        alert('아이디, 비밀번호가 일치하지 않습니다.');
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
          <LoginDiv>
            <SearchButton onClick={handleLogin}>로그인</SearchButton>
          </LoginDiv>
          <StyledLink to={'/RegisterForm'}>
            <SearchButton onClick={handleRetister}>회원가입</SearchButton>
          </StyledLink>
        </SubmitDiv>
      </Form>
    </Container>
  );
}

export default Login;
