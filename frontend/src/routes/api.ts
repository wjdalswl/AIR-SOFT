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
  항공사: string;
  운항편명: string;
  출발공항: string;
  도착공항: string;
  출발시간: string;
  도착시간: string;
  운항요일: string;
  시작일자: string;
  종료일자: string;
}

export function fetchFlight(): Promise<ApiResponse> {
  return fetch(`${BASE_URL}`).then((response) => response.json());
}
