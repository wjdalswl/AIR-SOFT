import { useState } from 'react';
import {
  Container,
  SubContainer,
  InputDiv,
  DataInputheading,
  DataInputDiv,
  SearchButton,
  StyledLink,
} from '../InTicketReservation/ TicketReservation';
import { useHistory } from 'react-router-dom';

function ReservationInquiry() {
  const history = useHistory();
  const today = new Date();
  const todayISOString = today.toISOString().split('T')[0];

  const [code, setCode] = useState('');
  const [date, setDate] = useState<string | undefined>(todayISOString);
  const [passengerLastName, setPassengerLastName] = useState('');
  const [passengerFirstName, setPassengerFirstName] = useState('');

  const handleDateChange = (value: string) => {
    setDate(value || todayISOString);
  };

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!code || !passengerLastName || !passengerFirstName) {
      alert('필드를 모두 입력해주세요.');
      return;
    }

    history.push({
      pathname: '/ShowReservation',
      state: code,
    });
  };

  return (
    <Container>
      <SubContainer>
        <InputDiv>
          <DataInputheading>예약번호</DataInputheading>
          <DataInputDiv>
            <input
              type="text"
              placeholder="A1B2C3"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </DataInputDiv>
        </InputDiv>
        <InputDiv>
          <DataInputheading>출발일</DataInputheading>
          <DataInputDiv>
            <span>📅</span>
            <input
              type="date"
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
              min={todayISOString}
              max="2023-12-31"
            />
          </DataInputDiv>
        </InputDiv>
      </SubContainer>
      <SubContainer>
        <InputDiv>
          <DataInputheading>승객 성</DataInputheading>
          <DataInputDiv>
            <input
              type="text"
              placeholder="홍(hong)"
              value={passengerLastName}
              onChange={(e) => setPassengerLastName(e.target.value)}
            />
          </DataInputDiv>
        </InputDiv>
        <InputDiv>
          <DataInputheading>승객 이름</DataInputheading>
          <DataInputDiv>
            <input
              type="text"
              placeholder="길동(gildong)"
              value={passengerFirstName}
              onChange={(e) => setPassengerFirstName(e.target.value)}
            />
          </DataInputDiv>
        </InputDiv>
      </SubContainer>
      <StyledLink
        to={{
          pathname: '/ShowReservation',
          state: code,
        }}
      >
        <SearchButton onClick={handleSearch}>조회</SearchButton>
      </StyledLink>
    </Container>
  );
}

export default ReservationInquiry;
