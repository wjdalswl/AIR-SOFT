import React, { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { TicketProps } from '../../api';

const Container = styled.div`
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

function SeatSelection() {
  const history = useHistory();
  const location = useLocation<TicketProps>();

  const rows = 10;
  const columns = 5;

  const [isOccupied, setIsOccupied] = useState<Array<boolean>>([]);
  const [selectedSeats, setSelectedSeats] = useState<
    { row: number; column: number }[]
  >([]);

  const { SeatData } = location.state || {};
  const passengerCount = SeatData?.passengerCount;
  const seatClass = SeatData?.flightData[0]?.seatClass;

  const isBusinessClass = seatClass === 'business';

  useEffect(() => {
    const fetchAndSetOccupancyData = async () => {
      try {
        const occupancyData = await fetchSeatOccupancyDataFromServer();
        const initialIsOccupied = generateInitialIsOccupied(
          rows,
          columns,
          isBusinessClass,
          occupancyData
        );
        setIsOccupied(initialIsOccupied);
      } catch (error: any) {
        console.error(
          'Error fetching or setting occupancy data:',
          error.message
        );
        // Handle error appropriately
      }
    };

    fetchAndSetOccupancyData();
  }, [rows, columns, isBusinessClass]);

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
        (seat) => `${columnToLetter(seat.row)}-${seat.column}`
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

// API에서 좌석 점유 데이터를 가져오는 함수
const fetchSeatOccupancyDataFromServer = async () => {
  try {
    const response = await fetch('/api/SeatSearch'); // API 엔드포인트에 맞게 수정 필요
    if (!response.ok) {
      throw new Error('데이터를 불러오는 데 실패했습니다.');
    }

    const data = await response.json();
    return data; // 서버로부터 받은 좌석 점유 데이터 배열을 반환
  } catch (error: any) {
    console.error('데이터를 가져오는 도중 에러가 발생했습니다:', error.message);
    // 에러 처리 로직 추가
  }
};

// 좌석 상태 응답 DTO 정의
interface SeatStatusResponseDTO {
  row: number;
  column: string;
  isOccupied: boolean;
}

// 페이지 생성시 현재 좌석 상태 업로드 함수
const generateInitialIsOccupied = (
  rows: number,
  columns: number,
  isBusinessClass: boolean,
  occupancyData: SeatStatusResponseDTO[]
) => {
  const initialIsOccupied = Array.from({ length: rows * columns }, () => false);

  if (occupancyData && Array.isArray(occupancyData)) {
    occupancyData.forEach((seat) => {
      const { row, column, isOccupied } = seat;
      const columnIndex = column.charCodeAt(0) - 'A'.charCodeAt(0);
      const seatIndex = (row - 1) * columns + columnIndex;

      if (seatIndex >= 0 && seatIndex < rows * columns) {
        if (isBusinessClass && columnIndex === 0) {
          initialIsOccupied[seatIndex] = isOccupied;
        } else if (!isBusinessClass && columnIndex >= 1 && columnIndex <= 9) {
          initialIsOccupied[seatIndex] = isOccupied;
        }
      }
    });
  }

  return initialIsOccupied;
};
