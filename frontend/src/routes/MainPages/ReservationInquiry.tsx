import { useState } from 'react';
import {
  Container,
  SubContainer,
  InputDiv,
  DataInputheading,
  DataInputDiv,
  SearchButton,
  StyledLink,
} from './InTicketReservation/ TicketReservation';

function ReservationInquiry() {
  const today = new Date();
  const todayISOString = today.toISOString().split('T')[0];

  const [reservationNumber, setReservationNumber] = useState('');
  const [date, setDate] = useState<string | undefined>(todayISOString);
  const [passengerLastName, setPassengerLastName] = useState('');
  const [passengerFirstName, setPassengerFirstName] = useState('');
  const [flightStatus, setFlightStatus] = useState(null);

  const handleDateChange = (value: string) => {
    setDate(value || todayISOString);
  };

  const handleSearch = () => {
    // 조회 기능 구현
    const queryParams = new URLSearchParams({});

    const apiUrl = `/api/FlightSelect?${queryParams.toString()}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Flight Data1111:', data);
      })
      .catch((error) => {
        // 에러 처리
        console.error(
          'There has been a problem with your fetch operation:',
          error
        );
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
              placeholder="KE1009"
              value={reservationNumber}
              onChange={(e) => setReservationNumber(e.target.value)}
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
          pathname: '/FlightSelect/Reservation',
        }}
      >
        <SearchButton onClick={handleSearch}>조회</SearchButton>
      </StyledLink>
    </Container>
  );
}

export default ReservationInquiry;
