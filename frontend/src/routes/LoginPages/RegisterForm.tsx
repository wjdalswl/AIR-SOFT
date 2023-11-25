import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { SearchButton } from '../MainPages/ TicketReservation';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function RegisterForm() {
  const registerhistory = useHistory();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    korName: '',
    engName: '',
    birth: '',
    phone: '',
    email: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 여기에서 폼 데이터를 서버로 보내는 로직을 추가할 수 있습니다.
    // 유효성 검사
    if (
      !formData.username ||
      !formData.password ||
      !formData.korName ||
      !formData.engName ||
      !formData.birth ||
      !formData.phone ||
      !formData.email
    ) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    // 비밀번호 확인
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert('비밀번호는 6자리 이상, 영문자, 숫자, 특수문자를 포함해야 합니다.');
      return;
    }

    // 전화번호 확인
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('전화번호는 010-0000-0000 형식이어야 합니다.');
      return;
    }
    console.log('Form Data Submitted:', formData);

    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Server response:', data);

        // 정보 입력이 완료되면 로그인 페이지로 이동
        registerhistory.push('/Login');
      })
      .catch((error) => {
        console.error('Error sending data to server:', error);
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">아이디:</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">비밀번호:</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="korName">한국 이름:</Label>
          <Input
            type="text"
            id="korName"
            name="korName"
            value={formData.korName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="engName">영어 이름:</Label>
          <Input
            type="text"
            id="engName"
            name="engName"
            value={formData.engName}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="birth">생일:</Label>
          <Input
            type="date"
            id="birth"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phoner">전화번호:</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="010-0000-0000"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">이메일:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>

        <SearchButton type="submit">회원 가입</SearchButton>
      </Form>
    </Container>
  );
}

export default RegisterForm;
