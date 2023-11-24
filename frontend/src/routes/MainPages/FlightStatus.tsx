import { useState } from 'react';
import {
  Container,
  SubContainer,
  LocationDiv,
  Locationheading,
  SwapButton,
  InputDiv,
  DataInputheading,
  DataInputDiv,
  SearchButton,
  StyledLink,
} from './ TicketReservation';

function FlightStatus() {
  //출발일 선택 제한을 위한 현재 날짜 불러오기
  const today = new Date();
  const todayISOString = today.toISOString().split('T')[0];

  const [departure, setDeparture] = useState('GMP');
  const [destination, setDestination] = useState('PUS');
  const [date, setDate] = useState<string | undefined>(todayISOString);

  const handleDepartureChange = (value: string) => {
    setDeparture(value || 'GMP');
  };

  const handleDestinationChange = (value: string) => {
    setDestination(value || 'PUS');
  };

  const handleDateChange = (value: string) => {
    setDate(value || todayISOString);
  };

  const handleSearch = () => {
    // 조회 기능 구현
    const queryParams = new URLSearchParams({
      departure: departure || 'GMP',
      destination: destination || 'PUS',
      date: date || todayISOString,
    });
  };

  //출발지와 도착지 바꾸는 버튼
  const swapDepartureDestination = () => {
    // Swap the values of departure and destination
    const temp = departure;
    handleDepartureChange(destination);
    handleDestinationChange(temp);
  };

  return (
    <Container>
      <SubContainer>
        <LocationDiv>
          <select
            value={departure}
            onChange={(e) => handleDepartureChange(e.target.value)}
          >
            <option value="GMP">GIMPO</option>
            <option value="PUS">BUSAN</option>
            <option value="CJJ">CHEONGJU</option>
            <option value="CJU">JEJU</option>
            <option value="ICN">INCHEON</option>
            <option value="KWJ">GWANGJU</option>
            <option value="TAE">DAEQU</option>
            <option value="USN">ULSAN</option>
          </select>
          <Locationheading>출발지</Locationheading>
        </LocationDiv>

        <SwapButton onClick={() => swapDepartureDestination()}></SwapButton>

        <LocationDiv>
          <select
            value={destination}
            onChange={(e) => handleDestinationChange(e.target.value)}
          >
            <option value="PUS">BUSAN</option>
            <option value="CJJ">CHEONGJU</option>
            <option value="CJU">JEJU</option>
            <option value="GMP">GIMPO</option>
            <option value="ICN">INCHEON</option>
            <option value="KWJ">GWANGJU</option>
            <option value="TAE">DAEQU</option>
            <option value="USN">ULSAN</option>
          </select>
          <Locationheading>도착지</Locationheading>
        </LocationDiv>
      </SubContainer>
      <InputDiv>
        <DataInputheading>출발일</DataInputheading>
        <DataInputDiv>
          <input
            type="date"
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
            min={todayISOString}
            max="2023-12-31"
          />
        </DataInputDiv>
      </InputDiv>

      <StyledLink
        to={{
          pathname: '/FlightSelect/Reservation',
        }}
      >
        <SearchButton onClick={handleSearch}>조회하기</SearchButton>
      </StyledLink>
    </Container>
  );
}
export default FlightStatus;
