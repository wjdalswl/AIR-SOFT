// Ticket.tsx
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import QRGenerator from '../InTicketReservation/QRGenerator';
import { TicketProps } from '../../api';
import { Container } from '../InTicketReservation/FlightSelect';

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

function ShowReservation() {
  const location = useLocation<TicketProps>();
  const {
    flightData,
    paymentType,
    passengerCount,
    paymentAmount,
    selectedSeats,
  } = location.state || {};

  const tickets = Array.from({ length: passengerCount || 0 }, (_, index) => ({
    flightDetails: {
      airline: flightData[0]?.flightNumber,
      departureTime: flightData[0]?.departureTime,
      arrivalTime: flightData[0]?.arrivalTime,
      passengerCount: passengerCount,
      date: flightData[0]?.id,
      seatClass: flightData[0]?.seatClass,
      departureDate: flightData[0]?.departureDate,
    },
    paymentAmount: paymentAmount,
    selectedSeat:
      typeof selectedSeats === 'string'
        ? selectedSeats.split(',')[index]
        : Array.isArray(selectedSeats)
        ? selectedSeats[index]
        : 'Not available',
  }));

  console.log(tickets);

  return (
    <Container>
      {tickets.map((ticket, index) => (
        <TicketContainer key={index}>
          <TicketHeader>
            <TicketTitle>{`항공편 티켓 ${index + 1}`}</TicketTitle>
            <TicketAmount>총 금액: {ticket.paymentAmount}원</TicketAmount>
          </TicketHeader>
          <TicketDetails>
            <p>항공사: {ticket.flightDetails?.airline}</p>
            <p>출발시간: {ticket.flightDetails?.departureTime}</p>
            <p>도착시간: {ticket.flightDetails?.arrivalTime}</p>
            <p>승객수: {ticket.flightDetails?.passengerCount}</p>
            <p>출발일: {ticket.flightDetails?.departureDate}</p>
            <p>좌석 등급: {ticket.flightDetails?.seatClass}</p>
          </TicketDetails>
          <TicketSeat>{`선택된 좌석: ${ticket.selectedSeat}`}</TicketSeat>
          <QRGenerator data={`티켓 ${index + 1}: ${JSON.stringify(ticket)}`} />
        </TicketContainer>
      ))}
    </Container>
  );
}

export default ShowReservation;
