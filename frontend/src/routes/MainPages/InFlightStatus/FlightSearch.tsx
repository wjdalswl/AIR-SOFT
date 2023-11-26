import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FlightData, SeatData } from '../../api';
import {
  Locationheading,
  LocationDiv,
} from '../InTicketReservation/ TicketReservation';
import {
  Container,
  SubContainer1,
  SubContainer,
  SubContainer2,
  FlightList,
  Flight,
  FlightNumber,
  TimeSpan,
  ArrowDiv,
  Title,
} from '../InTicketReservation/FlightSelect';
import {
  StyledLink,
  SearchButton,
} from '../InTicketReservation/ TicketReservation';

function FlightSelect() {
  const history = useHistory();
  const location = useLocation<SeatData>();
  const searchResults = location.state?.flightData || [];

  const [flightData, setFlightData] = useState<FlightData[]>([]);
  const [arrivalTimes, setArrivalTimes] = useState<string[]>([]);
  const [departureTimes, setDepartureTimes] = useState<string[]>([]);

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setFlightData(searchResults);

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
  }, [location.state, searchResults]);

  const handleHome = () => {
    history.push({
      pathname: `/SeatSelection`,
    });
  };

  return (
    <Container>
      {flightData.length > 0 ? (
        <>
          <Title>항공편 조회</Title>
          <FlightList>
            {flightData.map((flight, index) => (
              <Flight key={index}>
                <SubContainer1>
                  <FlightNumber>{flight.flightNumber}</FlightNumber>
                  <span>{flight.departureDate}</span>
                </SubContainer1>
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
                    <Locationheading>✈️{flight.arrivalAirport}</Locationheading>
                  </LocationDiv>
                </SubContainer>
                <SubContainer2>
                  <span>💺남아있는 좌석 수: {flight.seatsTotal}</span>
                  <span>💸이코노미석 금액: 100000원</span>
                  <span>💵비즈니스석 금액: 150000원</span>
                </SubContainer2>
              </Flight>
            ))}
          </FlightList>
          <StyledLink
            to={{
              pathname: '/',
            }}
          >
            <SearchButton onClick={handleHome}>홈으로 돌아가기</SearchButton>
          </StyledLink>
        </>
      ) : (
        <>
          <SubContainer>
            <span>일치하는 데이터가 없습니다.</span>
          </SubContainer>
          <StyledLink
            to={{
              pathname: '/',
            }}
          >
            <SearchButton onClick={handleHome}>Home</SearchButton>
          </StyledLink>
        </>
      )}
    </Container>
  );
}

export default FlightSelect;
