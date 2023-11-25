import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Container } from '../MainPages/InTicketReservation/FlightSelect';
import { SearchButton } from '../MainPages/ TicketReservation';
import { useHistory } from 'react-router-dom';
import { getToken, removeToken } from '../token';

function MyPage() {
  const token = getToken();
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token);

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
      <h1>마이페이지</h1>
      {isLoggedIn ? (
        <Container>
          {/* <div>
            <p>마일리지: {mileage}점</p>
          </div>
          <div>
            <h2>예약 확인</h2>
            {reservations.length > 0 ? (
              <ul>
                {reservations.map((reservation, index) => (
                  <li key={index}>{reservation}</li>
                ))}
              </ul>
            ) : (
              <p>예약 내역이 없습니다.</p>
            )}
          </div> */}
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
