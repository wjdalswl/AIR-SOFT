import React from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { getToken } from './token';

const StatusBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #677486;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleColumn = styled.span`
  font-size: 36px;
  letter-spacing: 3px;
  span::before,
  span::after {
    content: '|';
    color: white;
    font-family: sans-serif;
    font-weight: 100;
    margin: 0px 20px;
  }
`;

const StatusBarColumn = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  color: white;
  background-color: ${(props) =>
    props.isActive ? 'rgba(128, 145, 171, 0.5)' : ''};
  border-radius: 30px;
  a {
    display: block;
    padding: 8px 16px;
  }
`;

const StatusBarItem = styled.span`
  padding: 0px 10px;
  font-size: 12px;
`;

function TopBar() {
  const HomeMatch = useRouteMatch('/TicketReservation');
  const LoginMatch = useRouteMatch({
    path: '/Login',
    exact: true,
  });
  const MyPageMatch = useRouteMatch({
    path: '/MyPage',
    exact: true,
  });

  const token = getToken();

  return (
    <>
      <StatusBarWrapper>
        <StatusBarColumn>
          <StatusBarItem>
            <Tab isActive={HomeMatch !== null}>
              <Link to={`/TicketReservation`}>홈</Link>
            </Tab>
          </StatusBarItem>
          <StatusBarItem>
            <span>예약</span>
          </StatusBarItem>
          <StatusBarItem>
            <span>공항</span>
          </StatusBarItem>
        </StatusBarColumn>

        <StatusBarColumn>
          <TitleColumn>
            <span>AIR SOFT</span>
          </TitleColumn>
        </StatusBarColumn>

        <StatusBarColumn>
          {token ? (
            // 토큰이 있을 때
            <Tab isActive={MyPageMatch !== null}>
              <Link to="/MyPage">마이페이지</Link>
            </Tab>
          ) : (
            // 토큰이 없을 때
            <Tab isActive={LoginMatch !== null}>
              <Link to={`/Login`}>로그인</Link>
            </Tab>
          )}
        </StatusBarColumn>
      </StatusBarWrapper>
    </>
  );
}

export default TopBar;
