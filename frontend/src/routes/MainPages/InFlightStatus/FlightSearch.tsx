import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FlightData, fetchFlight } from '../../api';

const Container = styled.div`
  width: 100%;
  height: 500vh;
  display: flex;
  padding-top: 60px;
  flex-direction: column;
  align-items: center;
`;

const FlightList = styled.ul``;

const Flight = styled.li`
  background-color: white;
  color: ${(props) => 'black'};
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px; //링크 누룰 수 있는 범위가 커짐
    transition: color 0.2s ease-in;
    color: black;
  }
  &:hover {
    a {
      color: ${(props) => 'red'};
    }
  }
`;

function FlightSearch() {
  const today = new Date();
  const todayISOString = today.toISOString().split('T')[0];

  const [flightData, setFlightData] = useState<FlightData[]>([]);
  const location = useLocation();

  // URL에서 쿼리 파라미터 추출
  const searchParams = new URLSearchParams(location.search);
  const departure = searchParams.get('departure') || 'GMP';
  const destination = searchParams.get('destination') || 'PUS';
  const date = searchParams.get('date') || todayISOString;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFlight();
        if (response.data) {
          const filteredData = response.data.filter((item) => {
            return (
              item.항공사 === 'KAL' &&
              item.출발공항 === departure &&
              item.도착공항 === destination
            );
          });
          setFlightData(filteredData);
        }
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };

    fetchData(); // fetchData 호출
  }, [location.search, todayISOString, departure, destination]);

  return (
    <Container>
      <div>
        {flightData.length > 0 ? (
          <div>
            <h3>항공편 조회 결과</h3>

            <FlightList>
              {flightData.map((flight, index) => (
                <Flight key={index}>
                  <span>{flight.항공사}☺️</span>
                  <span>{flight.출발시간}☺️</span>
                  <span>{flight.출발공항}☺️</span>
                  <span>{flight.운항편명}☺️</span>
                  <span>{flight.운항요일}☺️</span>
                  <span>{flight.시작일자}☺️</span>
                  <span>{flight.도착시간}☺️</span>
                  <span>{flight.도착공항}☺️</span>
                </Flight>
              ))}
            </FlightList>
          </div>
        ) : (
          <p>일치하는 데이터가 없습니다.</p>
        )}
      </div>
    </Container>
  );
}

export default FlightSearch;
