import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// 탑 바
import TopBar from './routes/TopBar';

// 메인 페이지
import MainPage from './routes/MainPages/MainPage';
import MyPage from './routes/LoginPages/MyPage';

//로그인 페이지
import Login from './routes/LoginPages/Login';
import RegisterForm from './routes/LoginPages/RegisterForm';
import ManagerPage from './routes/LoginPages/Manager/ManagerPage';

//항공권 예매
import FlightSelect from './routes/MainPages/InTicketReservation/FlightSelect';
import SeatSelection from './routes/MainPages/InTicketReservation/ SeatSelection';
import PaymentConfirmation from './routes/MainPages/InTicketReservation/PaymentConfirmation';
import Ticket from './routes/MainPages/InTicketReservation/Ticket';

//예약 조회
import ShowReservation from './routes/MainPages/InReservationInquiry.tsx/ShowReservation';

//항공편 현황
import FlightSearch from './routes/MainPages/InFlightStatus/FlightSearch';

function Router() {
  return (
    <BrowserRouter>
      // 탑 바
      <TopBar />
      <Switch>
        //로그인 페이지
        <Route path="/Login">
          <Login />
        </Route>
        <ProtectedRoute path="/MyPage" component={MyPage} />
        <Route path="/RegisterForm">
          <RegisterForm />
        </Route>
        <Route path="/RegisterForm">
          <RegisterForm />
        </Route>
        //항공권 예매
        <Route path="/ManagerPage">
          <ManagerPage />
        </Route>
        <ProtectedRoute path="/SeatSelection" component={SeatSelection} />
        <ProtectedRoute
          path="/PaymentConfirmation"
          component={PaymentConfirmation}
        />
        <ProtectedRoute path="/Ticket" component={Ticket} />
        <Route path="/FlightSelect">
          <FlightSelect />
        </Route>
        //예약 조회
        <Route path="/ShowReservation">
          <ShowReservation />
        </Route>
        //항공편 현황
        <Route path="/FlightSearch">
          <FlightSearch />
        </Route>
        // 메인 페이지
        <Route path="">
          <MainPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
