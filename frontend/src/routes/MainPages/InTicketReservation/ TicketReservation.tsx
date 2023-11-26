import { styled } from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export const Container = styled.div`
  margin: 0;
  padding: 15px;
  width: 80%;
  height: 46vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
const PaymentTypeButtons = styled.div`
  margin-left: -290px;
  margin-right: auto;
  border-radius: 20px;
  border: 1px solid #8091ab;
  padding: 0;
  background-color: rgba(255, 255, 255, 0.6);
`;

interface PaymentTypeButtonProps {
  isMileageReservation: boolean;
}

const PaymentTypeButton = styled.button<PaymentTypeButtonProps>`
  font-size: 12px;
  margin: 0;
  padding: 5px 7px;
  border: none;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isMileageReservation ? 'rgba(128, 145, 171, 0.82)' : 'transparent'};
`;

export const LocationDiv = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & select {
    border: 0;
    background: none;
    font-size: 23px;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

export const Locationheading = styled.span`
  margin-top: 10px;
`;

export const SwapButton = styled.button`
  width: 80px;
  height: 80px;
  border: none;
  background-image: url('/images/swapbutton.png');
  background-color: transparent;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

export const DataInputheading = styled.span`
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 5px 5px;
  margin: 0;
  border-radius: 15px;
  color: 'black';
`;

export const DataInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
`;

export const InputDiv = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-right: 20px;
  margin-left: 20px;
  border-bottom: 1px solid #8091ab;

  & ${DataInputDiv} {
    margin: 10px 0px 5px 0px;
    & span {
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
    }
    & input {
      margin: 0;
      padding: 5px;
      border: 0;
      background: none;
      color: #8091ab;
      width: 100%;
    }
    & input[type='date'] {
      position: relative;
    }

    input[type='date']::-webkit-calendar-picker-indicator {
      position: absolute;
      top: 0;
      left: 0;
      color: transparent;
      display: block;
      opacity: 0;
      width: 100%;
      height: 100%;
    }
    & select {
      margin: 0;
      padding: 5px;
      border: 0;
      background: none;
      color: #8091ab;
    }
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-top: 10px;
  margin-left: auto;
  margin-right: 25px;
`;

export const SearchButton = styled.button`
  background-color: rgba(128, 145, 171, 0.82);
  width: 120px;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #677486; /* 마우스 오버 시 배경색 변경 */
  }
`;

function TicketReservation() {
  //출발일 선택 제한을 위한 현재 날짜 불러오기
  const history = useHistory();
  const today = new Date();
  const todayISOString = today.toISOString().split('T')[0];

  const [paymentType, setPaymentType] = useState('Reservation');
  const [departure, setDeparture] = useState('GMP');
  const [destination, setDestination] = useState('PUS');
  const [date, setDate] = useState<string | undefined>(todayISOString);
  const [passengerCount, setPassengerCount] = useState(1);
  const [seatClass, setSeatClass] = useState('economy');

  const handlePaymentTypeChange = (type: string) => {
    setPaymentType(type);

    if (type === 'MileageReservation') {
      setPassengerCount(1);
    }
  };

  const handleDepartureChange = (value: string) => {
    setDeparture(value || 'GMP');
  };

  const handleDestinationChange = (value: string) => {
    setDestination(value || 'PUS');
  };

  const handleDateChange = (value: string) => {
    setDate(value || todayISOString);
  };

  const handlePassengerCountChange = (value: number) => {
    setPassengerCount(value);
  };

  const handleSeatClassChange = (value: string) => {
    setSeatClass(value || 'economy');
  };

  const handleSearch = () => {
    // 조회 기능 구현
    const queryParams = new URLSearchParams({
      departure,
      destination,
      date: date || todayISOString,
      seatClass,
    });

    const apiUrl = `/api/FlightSelect?${queryParams.toString()}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const queryParams = {
          paymentType: paymentType,
          flightData: data,
          passengerCount: passengerCount,
        };

        history.push({
          pathname: '/FlightSelect',
          state: queryParams,
        });
      })
      .catch((error) => {
        // 에러 처리
        console.error(
          'There has been a problem with your fetch operation:',
          error
        );
      });
  };

  //출발지와 도착지 바꾸는 버튼
  const swapDepartureDestination = () => {
    const temp = departure;
    handleDepartureChange(destination);
    handleDestinationChange(temp);
  };

  return (
    <Container>
      <SubContainer>
        <PaymentTypeButtons>
          <PaymentTypeButton
            onClick={() => handlePaymentTypeChange('Reservation')}
            isMileageReservation={paymentType === 'Reservation'}
          >
            예매
          </PaymentTypeButton>
          <PaymentTypeButton
            onClick={() => handlePaymentTypeChange('MileageReservation')}
            isMileageReservation={paymentType === 'MileageReservation'}
          >
            마일리지 예매
          </PaymentTypeButton>
        </PaymentTypeButtons>
      </SubContainer>

      <SubContainer>
        <LocationDiv>
          <select
            value={departure}
            onChange={(e) => handleDepartureChange(e.target.value)}
          >
            <option value="GMP">GIMPO</option>
            <option value="PUS">BUSAN</option>
            <option value="CJJ">CHEONGJU</option>
            <option value="CJU">JEJU</option>
            <option value="ICN">INCHEON</option>
            <option value="KWJ">GWANGJU</option>
            <option value="TAE">DAEQU</option>
            <option value="USN">ULSAN</option>
          </select>
          <Locationheading>출발지</Locationheading>
        </LocationDiv>

        <SwapButton onClick={() => swapDepartureDestination()}></SwapButton>

        <LocationDiv>
          <select
            value={destination}
            onChange={(e) => handleDestinationChange(e.target.value)}
          >
            <option value="PUS">BUSAN</option>
            <option value="CJJ">CHEONGJU</option>
            <option value="CJU">JEJU</option>
            <option value="GMP">GIMPO</option>
            <option value="ICN">INCHEON</option>
            <option value="KWJ">GWANGJU</option>
            <option value="TAE">DAEQU</option>
            <option value="USN">ULSAN</option>
          </select>
          <Locationheading>도착지</Locationheading>
        </LocationDiv>
      </SubContainer>
      <SubContainer>
        <InputDiv>
          <DataInputheading>출발일</DataInputheading>
          <DataInputDiv>
            <span>📅</span>
            <input
              type="date"
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
              min={todayISOString}
              max="2023-12-31"
            />
          </DataInputDiv>
        </InputDiv>

        <InputDiv>
          <DataInputheading>탑승객</DataInputheading>
          <DataInputDiv>
            <span>👥</span>
            <input
              type="number"
              value={passengerCount}
              onChange={(e) =>
                handlePassengerCountChange(Number(e.target.value))
              }
              min={1}
              max={paymentType === 'MileageReservation' ? 1 : undefined}
            />
          </DataInputDiv>
        </InputDiv>

        <InputDiv>
          <DataInputheading>좌석 등급</DataInputheading>
          <DataInputDiv>
            <span>💺</span>
            <select
              value={seatClass}
              onChange={(e) => handleSeatClassChange(e.target.value)}
            >
              <option value="economy">이코노미석</option>
              <option value="business">비즈니스석</option>
            </select>
          </DataInputDiv>
        </InputDiv>
      </SubContainer>

      <StyledLink
        to={{
          pathname: '/FlightSelect',
          search: `?&departure=${departure}&destination=${destination}&date=${date}&seatClass=${seatClass}`,
        }}
      >
        <SearchButton onClick={handleSearch}>항공편 검색</SearchButton>
      </StyledLink>
    </Container>
  );
}
export default TicketReservation;
