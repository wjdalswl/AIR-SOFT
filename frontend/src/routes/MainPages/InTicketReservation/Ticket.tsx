// Ticket.tsx
import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import QRGenerator from './QRGenerator';

interface LocationState {
  flightDetails?: {
    airline: string;
    departureTime: string;
    arrivalTime: string;
    passengerCount: number;
    date: string;
    seatClass: string;
  };
  selectedSeats?: string[] | string;
  totalAmount?: number;
}

const Container = styled.div`
  width: 100%;
  height: 500vh;
  display: flex;
  padding-top: 60px;
  flex-direction: column;
  align-items: center;
`;

const TicketContainer = styled.div`
  border: 2px solid #333;
  padding: 20px;
  margin-top: 20px;
  max-width: 400px;
`;

const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TicketTitle = styled.h3`
  margin: 0;
`;

const TicketDetails = styled.div`
  margin-bottom: 10px;
`;

const TicketAmount = styled.div`
  font-weight: bold;
`;

const TicketSeat = styled.div`
  font-size: 14px;
`;

function Ticket() {
  const location = useLocation<LocationState>();
  const { flightDetails, selectedSeats, totalAmount } = location.state || {};

  const tickets = Array.from(
    { length: flightDetails?.passengerCount || 0 },
    (_, index) => ({
      flightDetails: {
        airline: flightDetails?.airline,
        departureTime: flightDetails?.departureTime,
        arrivalTime: flightDetails?.arrivalTime,
        passengerCount: 1,
        date: flightDetails?.date,
        seatClass: flightDetails?.seatClass,
      },
      totalAmount,
      selectedSeat:
        typeof selectedSeats === 'string'
          ? selectedSeats.split(',')[index]
          : 'Not available',
    })
  );

  console.log(tickets);

  return (
    <Container>
      {tickets.map((ticket, index) => (
        <TicketContainer key={index}>
          <TicketHeader>
            <TicketTitle>{`항공편 티켓 ${index + 1}`}</TicketTitle>
            <TicketAmount>총 금액: {ticket.totalAmount}원</TicketAmount>
          </TicketHeader>
          <TicketDetails>
            <p>항공사: {ticket.flightDetails?.airline}</p>
            <p>출발시간: {ticket.flightDetails?.departureTime}</p>
            <p>도착시간: {ticket.flightDetails?.arrivalTime}</p>
            <p>승객수: {ticket.flightDetails?.passengerCount}</p>
            <p>출발일: {ticket.flightDetails?.date}</p>
            <p>좌석 등급: {ticket.flightDetails?.seatClass}</p>
          </TicketDetails>
          <TicketSeat>{`선택된 좌석: ${ticket.selectedSeat}`}</TicketSeat>
          {/* Include QR code using the QRGenerator component */}
          <QRGenerator data={`티켓 ${index + 1}: ${JSON.stringify(ticket)}`} />
        </TicketContainer>
      ))}
    </Container>
  );
}

export default Ticket;
