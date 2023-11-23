import { styled } from 'styled-components';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';

import TicketReservation from './ TicketReservation';
import ReservationInquiry from './ReservationInquiry';
import CheckIn from './CheckIn';
import FlightStatus from './FlightStatus';

const Container = styled.div`
  margin: 56px 0px 0px 0px;
  padding: 0;
  padding-top: 60px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 80vh;
  background-image: url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const Header = styled.header`
  padding-top: 50px;
  margin-bottom: 30px;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tabs = styled.div`
  display: grid;
  width: 80%;
  grid-template-columns: repeat(4, 1fr);
  margin: 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) =>
    props.isActive ? 'rgba(255, 255, 255, 0.5)' : 'rgba(128, 145, 171, 0.5)'};
  padding: 7px 0px;
  border-radius: 10px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  color: ${(props) => (props.isActive ? 'black' : 'white')};
  a {
    display: block;
  }
`;

function MainPage() {
  const TicketReservationMatch = useRouteMatch('/TicketReservation');
  const ReservationInquiryMatch = useRouteMatch('/ReservationInquiry');
  const CheckInMatch = useRouteMatch('/CheckIn');
  const FlightStatusMatch = useRouteMatch('/FlightStatus');

  const history = useHistory();

  // 페이지가 로드될 때 항공권 예매 탭을 활성화
  useEffect(() => {
    history.push('/TicketReservation');
  }, [history]);

  return (
    <Container>
      <Helmet>
        <title>AIR SOFT</title>
      </Helmet>

      <>
        <Header>
          <span>Make a reservation</span>
        </Header>
        <div></div>
        <Tabs>
          <Tab isActive={TicketReservationMatch !== null}>
            <Link to={`/TicketReservation`}>항공권 예매</Link>
          </Tab>
          <Tab isActive={ReservationInquiryMatch !== null}>
            <Link to={`/ReservationInquiry`}>예약 조회</Link>
          </Tab>
          <Tab isActive={CheckInMatch !== null}>
            <Link to={`/CheckIn`}>체크인</Link>
          </Tab>
          <Tab isActive={FlightStatusMatch !== null}>
            <Link to={`/FlightStatus`}>항공편 현황</Link>
          </Tab>
        </Tabs>

        <Switch>
          <Route path={`/TicketReservation`}>
            <TicketReservation />
          </Route>
          <Route path={`/ReservationInquiry`}>
            <ReservationInquiry />
          </Route>
          <Route path={`/CheckIn`}>
            <CheckIn />
          </Route>
          <Route path={`/FlightStatus`}>
            <FlightStatus />
          </Route>
        </Switch>
      </>
    </Container>
  );
}
export default MainPage;
