import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { TicketProps } from '../../api';
import { PaymentButton } from './ SeatSelection';
import { StyledLink } from '../ TicketReservation';

const Container = styled.div`
  width: 100%;
  height: 500vh;
  display: flex;
  padding-top: 60px;
  flex-direction: column;
  align-items: center;
`;

function PaymentConfirmation() {
  const location = useLocation<TicketProps>();
  const history = useHistory();

  const { flightData, paymentType, passengerCount, paymentAmount } =
    location.state || {};
  const [flightDataState, setFlightDataState] = useState<TicketProps>({
    flightData: flightData || [],
    paymentType: paymentType || '',
    passengerCount: passengerCount || 0,
    paymentAmount: paymentAmount || 0,
  });
  const [arrivalTimes, setArrivalTimes] = useState<string[]>([]);
  const [departureTimes, setDepartureTimes] = useState<string[]>([]);

  const [selectedSeats, setSelectedSeats] = useState<
    string[] | string | undefined
  >(location.state?.selectedSeats);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);

  useEffect(() => {
    if (location.state?.flightData) {
      setFlightDataState(location.state);

      const seatsString = location.state.selectedSeats || '';
      setSelectedSeats(
        Array.isArray(seatsString) ? seatsString : seatsString.split(',')
      );
      const formattedArrivalTimes = location.state.flightData.map((flight) => {
        const arrivalDateTime = new Date(flight.arrivalTime);

        return arrivalDateTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });
      });

      const formattedDepartureTimes = location.state.flightData.map(
        (flight) => {
          const departureDateTime = new Date(flight.departureTime);

          return departureDateTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          });
        }
      );

      setArrivalTimes(formattedArrivalTimes);
      setDepartureTimes(formattedDepartureTimes);
    } else {
      // 데이터가 없으면 홈페이지로 이동
      alert(`데이터가 존재하지 않습니다.`);
      history.push('/');
    }
  }, [location.state, history]);

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const handleTicketPurchase = () => {
    // 티켓 발매 로직을 여기에 추가
    // alert을 통해 구매 완료 메시지 표시
    alert(
      `티켓 발매가 완료되었습니다. 총 금액: ${flightDataState?.paymentAmount}원`
    );

    const ticketData = {
      userId: 1,

      flightId: location.state.flightData[0].id,

      seatClass: location.state.flightData[0].seatClass,

      passengers: location.state.passengerCount,

      selectedSeats: location.state.selectedSeats,
    };
    console.log(ticketData);
    // 서버로 POST 요청
    fetch('/api/reservations/reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log('Server response:', data);

        // 티켓 발매가 완료되면 Ticket 페이지로 이동
        history.push({
          pathname: '/Ticket',
          state: location.state,
        });
      })
      .catch((error) => {
        console.error('Error sending data to server:', error);
      });
  };

  return (
    <Container>
      <div>
        <h2>결제 확인 페이지</h2>
        <div>
          <h3>항공편 정보</h3>
          <p>항공편명: {flightDataState?.flightData[0]?.flightNumber}</p>
          <p>출발공항: {flightDataState?.flightData[0]?.arrivalAirport}</p>
          <p>출발시간: {departureTimes[0]}</p>
          <p>도착공항: {flightDataState?.flightData[0]?.departureAirport}</p>
          <p>도착시간: {arrivalTimes[0]}</p>
          <p>좌석 등급: {flightDataState?.flightData[0]?.seatClass}</p>
          <p>승객수: {flightDataState?.passengerCount}</p>
          <p>총 금액: {flightDataState?.paymentAmount}원</p>
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
        <StyledLink
          to={{
            pathname: '/Ticket',
          }}
        >
          <PaymentButton
            onClick={handleTicketPurchase}
            disabled={!isCheckboxChecked}
          >
            티켓 발매
          </PaymentButton>
        </StyledLink>
      </div>
    </Container>
  );
}

export default PaymentConfirmation;
