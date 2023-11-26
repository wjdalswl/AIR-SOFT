import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Container } from '../../MainPages/InTicketReservation/FlightSelect';
import { FormButton } from '../RegisterForm';

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
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 20px;
`;

function ManagerPage() {
  //   const [file, setFile] = useState<File | null>(null);

  //   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const selectedFile = event.target.files?.[0];
  //     setFile(selectedFile);
  //   };

  //   const onSubmit = async () => {
  //     if (file) {
  //       const formData = new FormData();
  //       formData.append('file', file);

  //       try {
  //         const response = await axios.post(
  //           'http://localhost:5000/upload',
  //           formData,
  //           {
  //             headers: {
  //               'Content-Type': 'multipart/form-data',
  //             },
  //           }
  //         );

  //         console.log('File uploaded successfully:', response.data);
  //       } catch (error) {
  //         console.error('Error uploading file:', error);
  //       }
  //     }
  //   };

  return (
    <Container>
      <SubContainer>
        <CSVInputDiv>
          <input type="file" />
        </CSVInputDiv>
        <FormButton>Upload</FormButton>
      </SubContainer>
    </Container>
  );
}

export default ManagerPage;
