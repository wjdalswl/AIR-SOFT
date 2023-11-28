import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QRGenerator from './QRGenerator';
import { TicketProps } from '../../api';
import { Container } from './FlightSelect';
import {
  ReservationsUl,
  Reservationli,
  ReservationId,
  Bin,
  Boldspan,
} from '../../LoginPages/MyPage';

function Ticket() {
  const [arrivalTime, setArrivalTime] = useState<string[]>([]);
  const [departureTime, setDepartureTime] = useState<string[]>([]);

  const location = useLocation<TicketProps>();
  const { flightData, passengerCount, paymentAmount, selectedSeats } =
    location.state || {};

  const tickets = Array.from({ length: passengerCount || 0 }, (_, index) => {
    const flightDetails = flightData[0];

    const arrivalTime = new Date(flightDetails?.arrivalTime || '');
    const departureTime = new Date(flightDetails?.departureTime || '');

    return {
      flightDetails: {
        airline: flightDetails?.flightNumber,
        arrivalAirport: flightDetails?.arrivalAirport,
        departureAirport: flightDetails?.departureAirport,
        departureTime: departureTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        arrivalTime: arrivalTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        passengerCount: passengerCount,
        date: flightDetails?.id,
        seatClass: flightDetails?.seatClass,
        departureDate: flightDetails?.departureDate,
      },
      paymentAmount: paymentAmount,
      selectedSeat:
        typeof selectedSeats === 'string'
          ? selectedSeats.split(',')[index]
          : Array.isArray(selectedSeats)
          ? selectedSeats[index]
          : 'Not available',
    };
  });

  return (
    <Container>
      <ReservationsUl>
        {tickets.map((ticket, index) => (
          <Reservationli key={index}>
            <ReservationId>총 금액: {ticket.paymentAmount}원</ReservationId>
            <Bin>
              <p>항공사: {ticket.flightDetails?.airline}</p>
              <p>출발일: {ticket.flightDetails?.departureDate}</p>
              <Boldspan>출발시간: {ticket.flightDetails?.departureTime}</Boldspan>
              <Boldspan>도착시간: {ticket.flightDetails?.arrivalTime}</Boldspan>
            </Bin>
            <Bin>
              <Boldspan>
                출발공항 {ticket.flightDetails?.departureAirport}
              </Boldspan>
              <Boldspan>
                도착공항 {ticket.flightDetails?.arrivalAirport}
              </Boldspan>
            </Bin>
            <Bin>
              <Boldspan>
                승객수: {ticket.flightDetails?.passengerCount}
              </Boldspan>
              <Boldspan>좌석 등급: {ticket.flightDetails?.seatClass}</Boldspan>
              <Boldspan>{`선택된 좌석: ${ticket.selectedSeat}`}</Boldspan>
            </Bin>
            <QRGenerator
              data={`티켓 ${index + 1}: ${JSON.stringify(ticket)}`}
            />
          </Reservationli>
        ))}
      </ReservationsUl>
    </Container>
  );
}

export default Ticket;
