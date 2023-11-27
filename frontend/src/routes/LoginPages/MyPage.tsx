import { useState, useEffect } from 'react';
import { Container } from '../MainPages/InTicketReservation/FlightSelect';
import { useHistory, Link } from 'react-router-dom';
import { getToken, removeToken } from '../TokenManagement/token';
import setAuthorizationToken from '../TokenManagement/setAuthorizationToken';
import QRCode from 'qrcode.react';
import styled from 'styled-components';
import { SearchButton } from '../MainPages/InTicketReservation/ TicketReservation';

const UserInforms = styled.div`
  padding: 15px 0px;
  background-color: white;
  width: 100%;
  height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const UserName = styled.span`
  font-family: sans-serif;
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 5px;
`;

const UserEnName = styled.span`
  margin-bottom: 20px;
  font-weight: 100;
  font-family: sans-serif;
`;
const UserInform = styled.div`
  width: 700px;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const UserInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border-bottom: 1px solid #d1cfdd;
`;
const UserInformationhead = styled.span`
  background-color: rgba(209, 207, 221, 0.8);
  padding: 5px 7px;
  border-radius: 20px;
  margin-bottom: 13px;
  font-family: sans-serif;
`;

const UserBth = styled.span``;

interface ReservationData {
  departureDate: string;
  arrivalDate: string;
  passengers: number;
  seatClass: string;
  seatRow: number;
  seatLetter: string;
  id: string;
}
const Title = styled.span`
  font-family: sans-serif;
  font-size: 30px;
  font-weight: 900;
  background-color: rgba(209, 207, 221, 0.7);
  padding: 7px 10px;
  margin: 20px;
  border-radius: 20px;
`;
export const ReservationsUl = styled.ul`
  width: 90%;
  height: 1000px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  overflow: auto;
`;

export const Reservationli = styled.li`
  background-color: rgba(255, 255, 255, 0.9);
  width: 300px;
  height: 480px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 30px 10px 30px;
  margin-bottom: 20px;
`;
export const ReservationId = styled.span`
  font-family: sans-serif;
  font-size: 23px;
  font-weight: 900;
  border-bottom: 2px solid black;
  border-top: 2px solid black;
  padding: 15px 0px;
`;

export const Bin = styled.div`
  margin: 10px 0px;
  display: flex;
  flex-direction: column;
  & p {
    font-weight: 100;
    color: rgba(0, 0, 0, 8);
  }
`;

export const Boldspan = styled.span`
  font-size: 15px;
  font-weight: 900;
  margin: 4px 0px;
`;

export const StyledButton = styled.button`
  background-color: rgba(128, 145, 171, 0.82);
  width: 120px;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin: 15px 0px;
  cursor: pointer;

  &:hover {
    background-color: #677486; /* 마우스 오버 시 배경색 변경 */
  }
`;
export const ManagerPageLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

function MyPage() {
  const token = getToken();
  setAuthorizationToken(token);

  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token);
  const [myPageData, setMyPageData] = useState<any>(null);
  const [arrivalTimes, setArrivalTimes] = useState<string[]>([]);
  const [departureTimes, setDepartureTimes] = useState<string[]>([]);
  setAuthorizationToken(token);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        // 서버에 특정 요청을 보내서 응답을 확인
        const response = await fetch('/check-server-status');

        if (!response.ok) {
          // 서버 응답이 실패하면 로그아웃 수행
          removeToken();
          setAuthorizationToken('');
          history.push('/TicketReservation');
        }
      } catch (error) {
        // 에러가 발생하면 로그아웃 수행
        removeToken();
        setAuthorizationToken('');
        history.push('/TicketReservation');
      }
    };

    // 5분(300000 밀리초)마다 서버 상태 확인
    const intervalId = setInterval(checkServerStatus, 300000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(intervalId);
  }, [history]);

  // 화면 생성시 서버에 데이터 요청, + isLoggedIn 변경 상항있을때도
  useEffect(() => {
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

          const arrivalTimes = data.reservations.map((reservation: any) => {
            const arrivalDateTime = new Date(reservation.arrivalTime);
            return arrivalDateTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            });
          });

          const departureTimes = data.reservations.map((reservation: any) => {
            const departureDateTime = new Date(reservation.departureTime);
            return departureDateTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            });
          });

          setArrivalTimes(arrivalTimes);
          setDepartureTimes(departureTimes);
        })
        .catch((error) => {
          console.error('Error sending MyPage data to server:', error);
        });
    }
  }, [isLoggedIn, token]);

  // 예약 취소 버튼 동작
  const handleCancelReservation = async (reservationId: string) => {
    try {
      const response = await fetch(
        `/api/reservations/cancel/${reservationId}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        // 서버에서 응답이 성공한 경우에만 상태를 갱신
        setMyPageData((prevData: any) => {
          // 새로운 상태를 계산하여 반환
          return {
            ...prevData,
            reservations: prevData.reservations.filter(
              (reservation: ReservationData) => reservation.id !== reservationId
            ),
          };
        });
      } else {
        console.error(
          'Failed to cancel reservation. Server response:',
          response
        );
      }
    } catch (error) {
      console.error('Error cancelling reservation:', error);
    }
  };

  // 로그아웃 버튼 동작 -> 로컬 스토리지 토큰 제거
  const handleLogout = () => {
    if (token) {
      removeToken();
      setIsLoggedIn(false);
      history.push('/TicketReservation');
    }
  };

  const handleManager = () => {
    history.push({
      pathname: '/ManagerPage',
    });
  };

  return (
    <>
      {isLoggedIn ? (
        <Container>
          <UserInforms>
            <UserName>{myPageData?.korName}</UserName>
            <UserEnName>영문 이름 {myPageData?.engName}</UserEnName>
            <UserInform>
              <UserInformation>
                <UserInformationhead>생년월일</UserInformationhead>
                <UserBth>{myPageData?.birth}</UserBth>
              </UserInformation>
              <UserInformation>
                <UserInformationhead>이메일</UserInformationhead>
                <UserBth>{myPageData?.email}</UserBth>
              </UserInformation>
              <UserInformation>
                <UserInformationhead>전화번호</UserInformationhead>
                <UserBth>{myPageData?.phone}</UserBth>
              </UserInformation>
            </UserInform>
          </UserInforms>
          <Title>예약 확인</Title>
          {myPageData?.reservations && myPageData.reservations.length > 0 ? (
            <ReservationsUl>
              {myPageData.reservations.map(
                (reservation: any, index: number) => (
                  <Reservationli key={index}>
                    <ReservationId>예약 번호: {reservation.id}</ReservationId>
                    <Bin>
                      <p>출발일: {reservation.departureDate}</p>
                      <Boldspan>출발시간 {departureTimes[index]}</Boldspan>
                      <Boldspan>도착시간 {arrivalTimes[index]}</Boldspan>
                    </Bin>
                    <Bin>
                      <Boldspan>
                        출발공항 {reservation.departureAirport}
                      </Boldspan>
                      <Boldspan>도착공항 {reservation.arrivalAirport}</Boldspan>
                    </Bin>
                    <Bin>
                      <Boldspan>좌석 등급: {reservation.seatClass}</Boldspan>
                      <Boldspan>
                        좌석 위치: {reservation.seatRow}-
                        {reservation.seatLetter}
                      </Boldspan>
                    </Bin>
                    <QRCode
                      value={`예약 정보: ${JSON.stringify(reservation)}`}
                    />
                    <StyledButton
                      onClick={() => handleCancelReservation(reservation.id)}
                    >
                      예약 취소
                    </StyledButton>
                  </Reservationli>
                )
              )}
            </ReservationsUl>
          ) : (
            <p>예약 내역이 없습니다.</p>
          )}
          <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
          <ManagerPageLink
            to={{
              pathname: '/ManagerPage',
            }}
          >
            <SearchButton onClick={handleManager}>관리자 페이지</SearchButton>
          </ManagerPageLink>
        </Container>
      ) : (
        <Container>
          <p>로그인이 필요합니다.</p>
        </Container>
      )}
    </>
  );
}

export default MyPage;
