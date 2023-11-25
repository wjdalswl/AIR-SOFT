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

function Router() {
  return (
    <BrowserRouter>
      <TopBar />
      <Switch>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/RegisterForm">
          <RegisterForm />
        </Route>
        <Route path="/FlightSelect">
          <FlightSelect />
        </Route>
        <Route path="/SeatSelection">
          <SeatSelection />
        </Route>
        <Route path="/PaymentConfirmation">
          <PaymentConfirmation />
        </Route>
        <Route path="/Ticket">
          <Ticket />
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
