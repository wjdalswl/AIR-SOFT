import { useState, useEffect } from 'react';
import { Container } from '../MainPages/InTicketReservation/FlightSelect';
import { SearchButton } from '../MainPages/InTicketReservation/ TicketReservation';
import { useHistory } from 'react-router-dom';
import { getToken, removeToken } from '../TokenManagement/token';
import setAuthorizationToken from '../TokenManagement/setAuthorizationToken';
import {
  FlightList,
  Title,
} from '../MainPages/InTicketReservation/FlightSelect';

function MyPage() {
  const token = getToken();
  setAuthorizationToken(token);

  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token);
  const [myPageData, setMyPageData] = useState<any>(null);

  useEffect(() => {
    // isLoggedIn이 변경되었을 때만 서버에 요청
    if (isLoggedIn) {
      fetch('/my-page', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Server response MyPage data:', data);
          setMyPageData(data);
        })
        .catch((error) => {
          console.error('Error sending MyPage data to server:', error);
        });
    }
  }, [isLoggedIn, token]);

  const handleLogout = () => {
    // 로그아웃 시 로컬 스토리지의 토큰을 제거합니다.
    if (token) {
      removeToken();

      setIsLoggedIn(false);

      history.push('/TicketReservation');
    }
  };

  return (
    <div>
      <Title>마이페이지</Title>
      {isLoggedIn ? (
        <Container>
          <div>
            <p>이름: {myPageData?.korName}</p>
            <p>영문 이름: {myPageData?.engName}</p>
            <p>생년월일: {myPageData?.birth}</p>
            <p>이메일: {myPageData?.email}</p>
            <p>전화번호: {myPageData?.phone}</p>
          </div>
          <div>
            <Title>예약 확인</Title>
            {myPageData?.reservations && myPageData.reservations.length > 0 ? (
              <FlightList>
                {myPageData.reservations.map(
                  (reservation: any, index: number) => (
                    <li key={index}>
                      <p>출발일: {reservation.departureDate}</p>
                      <p>도착일: {reservation.arrivalDate}</p>
                      <p>승객 수: {reservation.passengers}</p>
                      <p>좌석 등급: {reservation.seatClass}</p>
                      <p>
                        좌석 위치: {reservation.seatRow}행{' '}
                        {reservation.seatLetter}열
                      </p>
                    </li>
                  )
                )}
              </FlightList>
            ) : (
              <p>예약 내역이 없습니다.</p>
            )}
          </div>
          <SearchButton onClick={handleLogout}>로그아웃</SearchButton>
        </Container>
      ) : (
        <Container>
          <p>로그인이 필요합니다.</p>
        </Container>
      )}
    </div>
  );
}

export default MyPage;
