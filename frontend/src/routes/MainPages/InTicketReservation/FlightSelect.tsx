import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FlightData } from '../../api';

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

function FlightSelect() {
  const [flightData, setFlightData] = useState<FlightData[]>([]);
  const [passengerCount, setPassengerCount] = useState<number | undefined>(1);
  const [paymentType, setPaymentType] = useState<string>('Reservation');
  const [paymentAmount, setPaymentAmount] = useState<number>(100000);

  const location = useLocation();

  const { flightData: searchResults } = (location.state as {
    flightData?: FlightData[];
  }) || { flightData: [] };

  useEffect(() => {
    if (searchResults) {
      console.log('Search Results:', searchResults);
      setFlightData(searchResults);
      console.log('Flight Data222222:', flightData);
      const defaultPaymentAmount = 100000;

      if (searchResults[0]?.seatClass === 'economy') {
        setPaymentAmount(100000); // 이코노미의 경우 10만원
      } else if (searchResults[0]?.seatClass === 'business') {
        setPaymentAmount(150000); // 퍼스트 클래스의 경우 15만원
      } else {
        setPaymentAmount(defaultPaymentAmount); // 다른 경우 기본값 설정
      }
    }
  }, [location.state, searchResults, passengerCount, paymentType]);

  return (
    <Container>
      <div>
        {flightData.length > 0 ? (
          <div>
            <h3>항공편 조회 결과</h3>
            <FlightList>
              {flightData.map((flight, index) => (
                <Flight key={index}>
                  <Link
                    to={{
                      pathname: `/SeatSelection`,
                      state: {
                        paymentType: paymentType,
                        id: flight.id,
                        flightNumber: flight.flightNumber,
                        arrivalAirport: flight.arrivalAirport,
                        departureAirport: flight.departureAirport,
                        arrivalTime: flight.arrivalTime,
                        departureTime: flight.departureTime,
                        seatClass: flight.seatClass,
                        seatsTotal: flight.seatsTotal,
                        passengerCount: passengerCount,
                        paymentAmount: paymentAmount,
                      },
                    }}
                  >
                    <span>{flight.flightNumber}☺️</span>
                    <span>{flight.arrivalAirport}☺️</span>
                    <span>{flight.departureAirport}☺️</span>
                    <span>{flight.arrivalTime}☺️</span>
                    <span>{flight.departureTime}☺️</span>
                    <span>{flight.seatsTotal}☺️</span>
                    <span>{paymentAmount}☺️</span>
                  </Link>
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

export default FlightSelect;
