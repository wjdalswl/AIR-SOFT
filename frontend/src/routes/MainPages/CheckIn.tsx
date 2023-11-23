import { styled } from 'styled-components';
import { useState } from 'react';

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

function CheckIn() {
  const [reservationNumber, setReservationNumber] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerLastName, setPassengerLastName] = useState('');
  const [passengerFirstName, setPassengerFirstName] = useState('');
  const [flightStatus, setFlightStatus] = useState(null);

  return (
    <Container>
      <div>
        <h2>항공편 조회</h2>
        <form>
          <div>
            <label>예약번호 또는 항공권번호:</label>
            <input
              type="text"
              value={reservationNumber}
              onChange={(e) => setReservationNumber(e.target.value)}
            />
          </div>
          <div>
            <label>출발일:</label>
            <input
              type="text"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </div>
          <div>
            <label>승객 성:</label>
            <input
              type="text"
              value={passengerLastName}
              onChange={(e) => setPassengerLastName(e.target.value)}
            />
          </div>
          <div>
            <label>승객 이름:</label>
            <input
              type="text"
              value={passengerFirstName}
              onChange={(e) => setPassengerFirstName(e.target.value)}
            />
          </div>
          <button type="button">조회</button>
        </form>

        {/* 항공편 조회 결과 표시 */}
        {flightStatus && (
          <div>
            <h3>항공편 조회 결과</h3>
            <p>항공사: </p>
            <p>출발지: </p>
            <p>도착지: </p>
          </div>
        )}
      </div>
    </Container>
  );
}

export default CheckIn;
