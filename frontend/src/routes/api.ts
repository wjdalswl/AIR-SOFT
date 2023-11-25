const apiUrl =
  'https://api.odcloud.kr/api/15043890/v1/uddi:2d3c9f86-3fa3-4d21-a20d-fac431d2bf6e';
const page = 4;
const perPage = 1720;
const serviceKey =
  'g%2Bd0EFsze343E%2Fo8lTEalCdZ3%2FFypuiMkHqsqOuJDVQjhCKcLwT3sKQEe%2BQSOFTxDrcTknCv7XRbrX7Av8rekA%3D%3D';

const BASE_URL = `${apiUrl}?page=${page}&perPage=${perPage}&serviceKey=${serviceKey}`;

export interface ApiResponse {
  page: number;
  perPage: number;
  totalCount: number;
  currentCount: number;
  matchCount: number;
  data: FlightData[]; // data를 FlightData 배열로 변경
}

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

export function fetchFlight(): Promise<ApiResponse> {
  return fetch(`${BASE_URL}`).then((response) => response.json());
}
