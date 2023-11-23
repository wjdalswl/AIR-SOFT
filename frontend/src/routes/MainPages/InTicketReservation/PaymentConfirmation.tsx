import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 500vh;
  display: flex;
  padding-top: 60px;
  flex-direction: column;
  align-items: center;
`;

interface LocationState {
  flightDetails?: {
    airline: string;
    departureTime: string;
    departureAirport: string;
    flightNumber: string;
    flightDay: string;
    startDate: string;
    arrivalTime: string;
    arrivalAirport: string;
    passengerCount: number;
    date: string;
    seatClass: string;
  };
  selectedSeats?: string[] | string;
}

function PaymentConfirmation() {
  const location = useLocation<LocationState>();
  const history = useHistory();

  const [flightDetails, setFlightDetails] = useState<
    LocationState['flightDetails'] | undefined
  >(undefined);
  const [selectedSeats, setSelectedSeats] = useState<
    string[] | string | undefined
  >(undefined);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);

  useEffect(() => {
    // 페이지가 마운트될 때 location.state에서 데이터를 가져옴
    if (location.state?.flightDetails) {
      setFlightDetails(location.state.flightDetails);

      // Ensure selectedSeats is a string before calling split
      const seatsString = location.state.selectedSeats || '';
      setSelectedSeats(
        Array.isArray(seatsString) ? seatsString : seatsString.split(',')
      );
    } else {
      // 데이터가 없으면 홈페이지로 이동
      history.push('/');
    }
  }, [location.state, history]);

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const calculateTotalAmount = () => {
    const basePrice = flightDetails?.seatClass === '이코노미' ? 100000 : 150000;
    const totalAmount = basePrice * (flightDetails?.passengerCount || 0);
    return totalAmount;
  };

  const handleTicketPurchase = () => {
    // 티켓 발매 로직을 여기에 추가
    // 예: alert을 통해 구매 완료 메시지 표시
    const totalAmount = calculateTotalAmount();
    alert(`티켓 발매가 완료되었습니다. 총 금액: ${totalAmount}원`);

    const queryParams = {
      ...location.state,
      totalAmount: totalAmount, // Optionally, you can include the total amount in queryParams
    };

    history.push({
      pathname: '/ticket',
      state: queryParams,
    });
  };

  return (
    <Container>
      <div>
        <h2>결제 확인 페이지</h2>
        <div>
          <h3>항공편 정보</h3>
          <p>항공사: {flightDetails?.airline}</p>
          <p>출발시간: {flightDetails?.departureTime}</p>
          <p>도착시간: {flightDetails?.arrivalTime}</p>
          <p>승객수: {flightDetails?.passengerCount}</p>
          <p>출발일: {flightDetails?.date}</p>
          <p>좌석 등급: {flightDetails?.seatClass}</p>
          <p>총 금액: {calculateTotalAmount()}원</p>
        </div>
        <div>
          <h3>선택된 좌석</h3>
          <ul>
            {selectedSeats &&
              (Array.isArray(selectedSeats) ? (
                selectedSeats.map((seat, index) => <li key={index}>{seat}</li>)
              ) : (
                <li>{selectedSeats}</li>
              ))}
          </ul>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isCheckboxChecked}
              onChange={handleCheckboxChange}
            />
            약관에 동의합니다.
          </label>
        </div>
        <div>
          <button onClick={handleTicketPurchase} disabled={!isCheckboxChecked}>
            티켓 발매
          </button>
        </div>
      </div>
    </Container>
  );
}

export default PaymentConfirmation;
