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
  const [flightData, setFlightData] = useState<any>(null);

  const handleDateChange = (value: string) => {
    setDate(value || todayISOString);
  };

  const handleSearch = () => {
    fetch(`/api/reservations/search?${code}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // 서버로부터 받은 데이터를 state에 설정
        setFlightData(data);

        // 데이터를 받은 후에 다음 페이지로 이동
        history.push({
          pathname: '/ShowReservation',
          state: { flightData: data },
        });
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
        }}
      >
        <SearchButton onClick={handleSearch}>조회</SearchButton>
      </StyledLink>
    </Container>
  );
}

export default ReservationInquiry;
