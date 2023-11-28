import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { TicketProps } from '../../api';
import { PaymentButton, StyledLink } from './ SeatSelection';
import { getToken } from '../../TokenManagement/token';
import { LocationDiv, Locationheading } from './ TicketReservation';
import {
  Title,
  Container,
  SubContainer1,
  FlightNumber,
  SubContainer2,
  TimeSpan,
  ArrowDiv,
} from './FlightSelect';
import { SubContainer } from '../../LoginPages/Manager/ManagerPage';

const ToTicketDiv = styled.div`
  width: 80%;
`;

const SubContainer3 = styled.div`
  margin-bottom: 20px;
  margin-bottom: 10px;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

function PaymentConfirmation() {
  const token = getToken();
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
      alert(`데이터가 존재하지 않습니다.`);
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
        Authorization: 'Bearer ' + token,
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
      <Title>결제 확인 페이지</Title>
      <SubContainer>
        <div>
          <h3>항공편 정보</h3>
        </div>

        <ToTicketDiv>
          <SubContainer1>
            <FlightNumber>
              항공편명: {flightDataState?.flightData[0]?.flightNumber}
            </FlightNumber>
            <FlightNumber>
              출발날짜: {flightDataState?.flightData[0]?.departureDate}
            </FlightNumber>
          </SubContainer1>

          <SubContainer3>
            <LocationDiv>
              <TimeSpan>{departureTimes[0]}</TimeSpan>
              <Locationheading>
                ✈️{flightDataState?.flightData[0]?.departureAirport}
              </Locationheading>
            </LocationDiv>
            <ArrowDiv></ArrowDiv>
            <LocationDiv>
              <TimeSpan>{arrivalTimes[0]}</TimeSpan>
              <Locationheading>
                ✈️{flightDataState?.flightData[0]?.arrivalAirport}
              </Locationheading>
            </LocationDiv>
          </SubContainer3>

          <p>좌석 등급: {flightDataState?.flightData[0]?.seatClass}</p>
          <p>승객수: {flightDataState?.passengerCount}</p>
          <SubContainer2>
            <span>💸총 지불 금액: {flightDataState?.paymentAmount}원</span>
            <div>
              <h3>선택된 좌석</h3>
              <ul>
                {selectedSeats &&
                  (Array.isArray(selectedSeats) ? (
                    selectedSeats.map((seat, index) => (
                      <li key={index}>{seat}</li>
                    ))
                  ) : (
                    <li>{selectedSeats}</li>
                  ))}
              </ul>
            </div>
          </SubContainer2>
        </ToTicketDiv>
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
      </SubContainer>
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
    </Container>
  );
}

export default PaymentConfirmation;
