import React, { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 500vh;
  display: flex;
  padding-top: 60px;
  flex-direction: column;
  align-items: center;
`;

const IMGContainer = styled.div`
  padding: 0;
  padding-top: 75vh;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 200vh;
  background-image: url('https://i.ibb.co/1zxpfdR/IMG-4416.jpg');
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SeatRow = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const SeatButton = styled.button<{
  isOccupied?: boolean;
  isSelected?: boolean;
}>`
  width: 40px;
  height: 40px;
  margin: 0 5px;
  background-color: ${(props) =>
    props.isSelected ? 'blue' : props.isOccupied ? 'red' : 'green'};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
`;

// 통로
const Passage = styled.div`
  width: 20px;
`;

const PaymentButton = styled.button<{ disabled: boolean }>`
  margin-top: 20px;
  padding: 10px;
  background-color: ${(props) => (props.disabled ? '#ccc' : 'green')};
  color: white;
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border-radius: 10px;
`;

const columnToLetter = (column: number): string => {
  let tempColumn = column;
  let columnName = '';

  while (tempColumn > 0) {
    const modulo = (tempColumn - 1) % 26;
    columnName = String.fromCharCode(65 + modulo) + columnName;
    tempColumn = Math.floor((tempColumn - 1) / 26);
  }

  return columnName;
};

interface LocationState {
  flightDetails?: {
    airline: string;
    departureTime: string;
    departureAirport: string;
    flightNumber: string;
    flightDay: string;
    startDate: string;
    arrivalTime: string;
    arrivalAirport: string;
    passengerCount: number;
    date: string;
    seatClass: string;
  };
}

// ... (이전 코드)

function SeatSelection() {
  const history = useHistory();
  const location = useLocation<LocationState>();

  const rows = 10;
  const columns = 5;

  const initialIsOccupied = Array.from(
    { length: rows * columns },
    () => Math.random() < 0.2
  );
  const [isOccupied, setIsOccupied] = useState(initialIsOccupied);
  const [selectedSeats, setSelectedSeats] = useState<
    { row: number; column: number }[]
  >([]);

  const { flightDetails } = location.state || {};
  const passengerCount = flightDetails?.passengerCount;

  const isSeatSelected = (row: number, column: number) => {
    return selectedSeats.some(
      (seat) => seat.row === row && seat.column === column
    );
  };

  const handleSeatClick = (row: number, column: number) => {
    // 이미 선택된 좌석인지 확인
    const seatIndex = selectedSeats.findIndex(
      (seat) => seat.row === row && seat.column === column
    );

    if (seatIndex !== -1) {
      // 이미 선택된 좌석이면 선택 취소
      const updatedSelectedSeats = [...selectedSeats];
      updatedSelectedSeats.splice(seatIndex, 1);
      setSelectedSeats(updatedSelectedSeats);
    } else {
      // 현재 선택된 좌석이 passengerCount를 초과하지 않는지 확인
      if (
        passengerCount !== undefined &&
        selectedSeats.length < passengerCount
      ) {
        const newSelectedSeat = { row, column };
        setSelectedSeats((prevSelectedSeats) => [
          ...prevSelectedSeats,
          newSelectedSeat,
        ]);
        console.log(
          `Selected Seat: Row ${row}, Column ${columnToLetter(column)}`
        );
      }
    }
  };

  const handlePaymentClick = () => {
    // 선택한 좌석 정보를 쿼리 파라미터로 전달하여 결제 페이지로 이동
    if (selectedSeats.length === passengerCount) {
      const selectedSeatStrings = selectedSeats.map(
        (seat) => `${columnToLetter(seat.column)}-${seat.row}`
      );

      const queryParams = {
        ...location.state,
        selectedSeats: selectedSeatStrings.join(','), // 좌석 정보를 콤마로 구분된 문자열로 변환
      };
      console.log('Query Parameters:', queryParams);

      history.push({
        pathname: '/PaymentConfirmation',
        state: queryParams,
      });
    }
  };

  return (
    <Container>
      <IMGContainer>
        {Array.from({ length: rows }, (_, rowIndex) => (
          <SeatRow key={rowIndex}>
            {Array.from({ length: columns }, (_, columnIndex) => (
              <React.Fragment key={columnIndex}>
                {columnToLetter(columnIndex + 1) === 'C' && <Passage />}
                <SeatButton
                  onClick={() => handleSeatClick(rowIndex + 1, columnIndex + 1)}
                  isOccupied={isOccupied[rowIndex * columns + columnIndex]}
                  isSelected={isSeatSelected(rowIndex + 1, columnIndex + 1)}
                >
                  {`${columnToLetter(columnIndex + 1)}-${rowIndex + 1}`}
                </SeatButton>
              </React.Fragment>
            ))}
          </SeatRow>
        ))}
      </IMGContainer>
      <PaymentButton
        disabled={selectedSeats.length !== passengerCount}
        onClick={handlePaymentClick}
      >
        결제하기
      </PaymentButton>
    </Container>
  );
}

export default SeatSelection;
