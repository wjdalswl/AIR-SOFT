import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FlightData, SeatData } from '../../api';
import { Locationheading, LocationDiv } from '../ TicketReservation';

export const Container = styled.div`
  margin: 0;
  padding-top: 80px;
  width: 100%;
  height: 175vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #677486;
`;

const SubContainer = styled.div`
  margin-bottom: 20px;
  margin-bottom: 10px;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const SubContainer2 = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-top: 1px solid #8091ab;
`;

const FlightList = styled.ul`
  width: 80%;
`;

const Flight = styled.li`
  background-color: rgba(255, 255, 255, 0.5);
  color: ${(props) => 'black'};
  border-radius: 15px;
  margin-bottom: 20px;
  a {
    display: flex;
    flex-direction: column;
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
const FlightNumber = styled.div`
  margin-left: 25px;
  margin-right: auto;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 3px 5px;
  border-radius: 20px;
`;
const TimeSpan = styled.span`
  font-family: sans-serif;
  font-weight: 600;
  font-size: 23px;
`;
const ArrowDiv = styled.div`
  width: 60px;
  height: 60px;
  background-image: url('/images/arrowIcon.png'); /* 이미지 경로로 변경 */
  background-color: transparent;
  background-size: cover; /* 이미지를 버튼에 맞게 조절 */
  background-repeat: no-repeat;
`;

const Title = styled.h1`
  font-size: 48px;
`;

function FlightSelect() {
  const location = useLocation<SeatData>();
  const searchResults = location.state?.flightData || [];

  const [paymentType, setPaymentType] = useState<string>('Reservation');
  const [flightData, setFlightData] = useState<FlightData[]>([]);
  const [passengerCount, setPassengerCount] = useState<number>(1);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [arrivalTimes, setArrivalTimes] = useState<string[]>([]);
  const [departureTimes, setDepartureTimes] = useState<string[]>([]);

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setFlightData(searchResults);
      setPaymentType(location.state?.paymentType);
      setPassengerCount(location.state?.passengerCount);

      const flight = searchResults[0];
      if (flight?.seatClass === 'economy') {
        setPaymentAmount(100000 * passengerCount); // 이코노미의 경우 10만원
      } else if (flight?.seatClass === 'business') {
        setPaymentAmount(150000 * passengerCount); // 퍼스트 클래스의 경우 15만원
      }
      const times = searchResults.map((flight) => {
        const arrivalDateTime = new Date(flight.arrivalTime);
        const departureDateTime = new Date(flight.departureTime);

        return {
          arrivalTime: arrivalDateTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          departureTime: departureDateTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
      });

      const arrivalTimes = times.map((time) => time.arrivalTime);
      const departureTimes = times.map((time) => time.departureTime);

      setArrivalTimes(arrivalTimes);
      setDepartureTimes(departureTimes);
    }
  }, [location.state, searchResults, passengerCount, paymentType]);

  return (
    <Container>
      {flightData.length > 0 ? (
        <>
          <Title>항공편 조회</Title>
          <FlightList>
            {flightData.map((flight, index) => (
              <Flight key={index}>
                <Link
                  to={{
                    pathname: `/SeatSelection`,
                    search: `?&SeatSelection=${flight.id}&seatClass=${flight.seatClass}`,
                    state: {
                      paymentType: paymentType,
                      flightData: flightData,
                      passengerCount: passengerCount,
                      paymentAmount: paymentAmount,
                    },
                  }}
                >
                  <SubContainer>
                    <FlightNumber>{flight.flightNumber}</FlightNumber>
                  </SubContainer>
                  <SubContainer>
                    <LocationDiv>
                      <TimeSpan>{departureTimes[index]}</TimeSpan>
                      <Locationheading>
                        ✈️{flight.departureAirport}
                      </Locationheading>
                    </LocationDiv>
                    <ArrowDiv></ArrowDiv>
                    <LocationDiv>
                      <TimeSpan>{arrivalTimes[index]}</TimeSpan>
                      <Locationheading>
                        ✈️{flight.arrivalAirport}
                      </Locationheading>
                    </LocationDiv>
                  </SubContainer>
                  <SubContainer2>
                    <span>💺남아있는 좌석 수: {flight.seatsTotal}</span>
                    <span>💸총 지불 금액: {paymentAmount}</span>
                  </SubContainer2>
                </Link>
              </Flight>
            ))}
          </FlightList>
        </>
      ) : (
        <SubContainer>
          <span>일치하는 데이터가 없습니다.</span>
        </SubContainer>
      )}
    </Container>
  );
}

export default FlightSelect;
