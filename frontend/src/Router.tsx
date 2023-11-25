import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TopBar from './routes/TopBar';
import MainPage from './routes/MainPages/MainPage';
import Login from './routes/LoginPages/Login';
import FlightSelect from './routes/MainPages/InTicketReservation/FlightSelect';
import SeatSelection from './routes/MainPages/InTicketReservation/ SeatSelection';
import PaymentConfirmation from './routes/MainPages/InTicketReservation/PaymentConfirmation';
import Ticket from './routes/MainPages/InTicketReservation/Ticket';
import FlightSearch from './routes/MainPages/InFlightStatus/FlightSearch';
import RegisterForm from './routes/LoginPages/RegisterForm';
import MyPage from './routes/LoginPages/MyPage';
import ProtectedRoute from './ProtectedRoute';

function Router() {
  return (
    <BrowserRouter>
      <TopBar />
      <Switch>
        <Route path="/Login">
          <Login />
        </Route>
        <ProtectedRoute path="/MyPage" component={MyPage} />
        <Route path="/RegisterForm">
          <RegisterForm />
        </Route>
        <Route path="/FlightSelect">
          <FlightSelect />
        </Route>
        <ProtectedRoute path="/SeatSelection" component={SeatSelection} />
        <ProtectedRoute
          path="/PaymentConfirmation"
          component={PaymentConfirmation}
        />
        <ProtectedRoute path="/Ticket" component={Ticket} />
        <Route path="/FlightSearch">
          <FlightSearch />
        </Route>
        <Route path="/FlightSearch">
          <FlightSearch />
        </Route>
        <Route path="">
          <MainPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
