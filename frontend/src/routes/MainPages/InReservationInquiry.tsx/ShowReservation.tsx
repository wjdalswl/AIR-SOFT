import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { FlightData } from '../../api';
import { Container } from '../InTicketReservation/FlightSelect';
import {
  ReservationsUl,
  Reservationli,
  ReservationId,
  Bin,
  Boldspan,
  StyledButton,
} from '../../LoginPages/MyPage';

function ShowReservation() {
  const history = useHistory();
  const location = useLocation();

  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [arrivalTimes, setArrivalTimes] = useState<string[]>([]);
  const [departureTimes, setDepartureTimes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.state === undefined) {
          // 첫 마운트 때 location.state가 undefined인 경우
          alert('일치하는 데이터가 없습니다.');
          return;
        }

        const response = await fetch(
          `/api/reservations/search?code=${location.state}`,
          {
            method: 'GET',
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log('Server response data:', data);
        setFlightData(data);

        const arrivalTime = new Date(data.arrivalTime);
        const departureTime = new Date(data.departureTime);

        setArrivalTimes([
          arrivalTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        ]);
        setDepartureTimes([
          departureTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        ]);
      } catch (error) {
        alert('일치하는 데이터가 없습니다.');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location.state]);

  const handleHome = () => {
    history.push('/');
  };

  return (
    <Container>
      {flightData ? (
        <>
          <ReservationsUl>
            <Reservationli>
              <ReservationId>예약 번호: {flightData?.id}</ReservationId>
              <Bin>
                <p>출발일: {flightData?.departureDate}</p>
                <Boldspan>출발시간 {departureTimes[0]}</Boldspan>
                <Boldspan>도착시간 {arrivalTimes[0]}</Boldspan>
              </Bin>
              <Bin>
                <Boldspan>좌석 등급: {flightData?.seatClass}</Boldspan>
                {/* Update the properties accordingly */}
                <Boldspan>
                  좌석 위치: {flightData?.seatRow}-{flightData?.seatLetter}
                </Boldspan>
                <Boldspan>
                  좌석 위치: {flightData?.seatRow}-{flightData?.seatLetter}
                </Boldspan>
              </Bin>
              <QRCode value={`예약 정보: ${JSON.stringify(flightData)}`} />
            </Reservationli>
          </ReservationsUl>
          <StyledButton onClick={handleHome}>홈으로</StyledButton>
        </>
      ) : (
        <>
          <p>예약 내역이 없습니다.</p>
          <StyledButton onClick={handleHome}>홈으로</StyledButton>
        </>
      )}
    </Container>
  );
}

export default ShowReservation;
