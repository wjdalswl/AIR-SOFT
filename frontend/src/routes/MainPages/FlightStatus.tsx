import { styled } from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 80%;
  height: 46vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  :nth-child(2) {
    margin: 20px 0px;
  }
`;

const Subheading = styled.span`
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 7px 0px;
  border-radius: 10px;
  color: 'black';
`;

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
        <div>
          <Subheading>출발지</Subheading>
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
        </div>

        <button onClick={() => swapDepartureDestination()}>Swap</button>

        <div>
          <Subheading>도착지</Subheading>
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
        </div>
      </SubContainer>
      <SubContainer>
        <div>
          <Subheading>출발일</Subheading>
          <input
            type="date"
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
            min={todayISOString}
            max="2023-12-31"
          />
        </div>
      </SubContainer>

      <Link
        to={{
          pathname: '/FlightSearch',
          search: `?departure=${departure}&destination=${destination}&date=${date}`,
        }}
      >
        <button onClick={handleSearch}>Search</button>
      </Link>
    </Container>
  );
}
export default FlightStatus;
