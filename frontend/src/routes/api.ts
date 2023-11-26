export interface FlightData {
  arrivalAirport: string;
  arrivalTime: string;
  departureAirport: string;
  departureTime: string;
  flightNumber: string;
  id: number;
  seatClass: string;
  seatsTotal: number;
  departureDate: string;
}

export interface SeatData {
  paymentType: string;
  flightData: FlightData[];
  passengerCount: number;
  paymentAmount: number;
}

export interface TicketProps {
  flightData: FlightData[];
  paymentType: string;
  passengerCount: number;
  paymentAmount: number;
  selectedSeats?: string[] | string;
}
