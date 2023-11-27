import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../../MainPages/InTicketReservation/FlightSelect';
import { FormButton } from '../RegisterForm';
import { getToken, removeToken } from '../../TokenManagement/token';
import setAuthorizationToken from '../../TokenManagement/setAuthorizationToken';

export const SubContainer = styled.div`
  margin: 0;
  padding: 15px;
  width: 80%;
  height: 46vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
`;

const CSVInputDiv = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  input[type='file'] {
    display: none;
  }

  label {
    cursor: pointer;
    padding: 10px;
    background-color: #04add2;
    color: #fff;
    border-radius: 5px;
    font-size: 14px;
    transition: background-color 0.3s;
    margin-right: 15px;

    &:hover {
      background-color: #ccc;
    }
  }
`;

function ManagerPage() {
  const token = getToken();
  setAuthorizationToken(token);

  const history = useHistory();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile && selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      setFile(null);
      alert('Please select a valid .csv file.');
    }
  };

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch('/check-server-status');

        if (!response.ok) {
          alert('관리자 권한이 없습니다.');
          history.push('/');
        }
      } catch (error) {
        alert('관리자 권한이 없습니다.');
        history.push('/');
      }
    };
    // 5분(300000 밀리초)마다 서버 상태 확인
    const intervalId = setInterval(checkServerStatus, 300000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(intervalId);
  }, [history]);

  const onSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('/adminupload', formData, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('File uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <Container>
      <SubContainer>
        <CSVInputDiv>
          <label htmlFor="fileInput">파일 선택</label>
          <span>{fileName ? fileName : 'Choose a .csv file'}</span>
          <input type="file" id="fileInput" accept=".csv" onChange={onChange} />
        </CSVInputDiv>
        <FormButton onClick={onSubmit}>Upload</FormButton>
      </SubContainer>
    </Container>
  );
}

export default ManagerPage;
