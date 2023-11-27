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

import TicketReservation from './InTicketReservation/ TicketReservation';
import ReservationInquiry from './InReservationInquiry.tsx/ReservationInquiry';
import CheckIn from './InCheckIn/CheckIn';
import FlightStatus from './InFlightStatus/FlightStatus';

export const Container = styled.div`
  margin: 0;
  width: 100%;
  height: 175vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #677486;
`;

const SubContainer = styled.div`
  margin: 0;
  padding-top: 50px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 90vh;
  background-image: url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.header`
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

const Advertisements = styled.div`
  margin: 0;
  padding: 30px;
  width: 100%;
  height: 230px;
  display: flex;
  justify-content: space-between;
`;
const Advertisement = styled.div`
  width: 30%;
  height: 100%;
  background-color: #b9d8ee;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  &:first-child {
    background-image: url('https://media.istockphoto.com/id/667040076/photo/sea.webp?b=1&s=170667a&w=0&k=20&c=qcm_wpZBhUJZRd2F-hEbIioRyil6apCC9WpaFkMRbZY=');
  }
  &:nth-child(2) {
    background-image: url('/images/AdImg1.jpeg');
  }
  &:last-child {
    background-image: url('/images/AdImg2.jpeg');
  }
`;
const AdSpanDiv = styled.div`
  width: 100%;
  height: 40%;
  margin-top: auto;
  margin-bottom: 10px;
`;
const AdSpan = styled.div`
  margin-left: auto;
  margin-right: -10px;
  z-index: 2;
  bottom: 10px;
  width: 200px;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
  font-family: sans-serif;
  & h1 {
    font-size: 19px;
    font-weight: 400;
    margin-bottom: 3px;
  }
`;
const NoticeAndDiv = styled.div`
  width: 100%;
  height: 250px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  padding: 0px 20px;
  justify-content: space-between;
`;

const Notice = styled.div`
  width: 80%;
  height: 250px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 20px;
`;

const Noticeheading = styled.span`
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 7px 10px;
  border-radius: 15px;
  margin-bottom: 5px;
  color: 'black';
`;

const NoticeContent = styled.div`
  padding-bottom: 5px;
  width: 100%;
  color: white;
  margin: 10px 0px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & :last-child {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const AppAd = styled.div`
  width: 250px;
  height: 250px;
  background-color: rgba(255, 255, 255, 0.5);
  background-size: cover;
  background-image: url('/images/AppAdImg.png');
  border-radius: 20px;
  display: flex;
  align-items: end;

  & span {
    font-size: 20px;
    color: white;
    margin: 10px;
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
      <SubContainer>
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
      </SubContainer>

      <Advertisements>
        <Advertisement>
          <AdSpanDiv>
            <AdSpan>
              <h1>광고 내용 넣어주세요.</h1>
              <p>광고 내용 넣어주세요.</p>
              <p>광고 내용 넣어주세요.</p>
            </AdSpan>
          </AdSpanDiv>
        </Advertisement>
        <Advertisement>
          <AdSpanDiv>
            <AdSpan>
              <h1>숭실대 재학생 혜택</h1>
              <p>광고 내용 넣어주세요.</p>
              <p>광고 내용 넣어주세요.</p>
            </AdSpan>
          </AdSpanDiv>
        </Advertisement>
        <Advertisement>
          <AdSpanDiv>
            <AdSpan>
              <h1>숭실대 학교 제휴</h1>
              <p>광고 내용 넣어주세요.</p>
              <p>광고 내용 넣어주세요.</p>
            </AdSpan>
          </AdSpanDiv>
        </Advertisement>
      </Advertisements>
      <NoticeAndDiv>
        <Notice>
          <Noticeheading>공지사항</Noticeheading>
          <NoticeContent>
            <span>📎 2024년 국제선 시범 운항 안내</span>
            <span>2023.11.24</span>
          </NoticeContent>
          <NoticeContent>
            <span>📎 국내선 유류할증료 (2023년 12월)</span>
            <span>2023.11.24</span>
          </NoticeContent>
          <NoticeContent>
            <span>📎 숭실대 제휴 서비스 상세 확인</span>
            <span>2023.11.24</span>
          </NoticeContent>
          <NoticeContent>
            <span>📎 AIR SOFT 스토어 연말 할인 프로모션</span>
            <span>2023.11.24</span>
          </NoticeContent>
        </Notice>
        <AppAd>
          <span>
            앱으로
            <br />
            &nbsp;더 간편해진
            <br />
            &nbsp;&nbsp;AIR SOFT를
            <br />
            &nbsp;&nbsp;&nbsp;만나보세요 →
          </span>
        </AppAd>
      </NoticeAndDiv>
    </Container>
  );
}
export default MainPage;
