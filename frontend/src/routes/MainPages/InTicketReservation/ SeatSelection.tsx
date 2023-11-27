import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { TicketProps } from '../../api';
import { Container } from './FlightSelect';

const IMGContainer = styled.div`
  margin-left: 10px;
  background-size: contain;
  background-repeat: no-repeat;
  width: 800px;
  height: 800px;
  background-image: url('https://i.ibb.co/bztnLcF/IMG-4416-2.jpg');
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Seats = styled.div`
  margin-top: auto;
  margin-bottom: 15px;
  margin-right: 273px;
  margin-left: auto;
`;

const SeatRow = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const SeatButton = styled.button<{
  isOccupied?: boolean;
  isSelected?: boolean;
  disabled?: boolean;
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
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Passage = styled.div`
  width: 20px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export const PaymentButton = styled.button<{ disabled: boolean }>`
  margin-top: 20px;
  padding: 10px;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#90B1C6')};
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
  const location = useLocation<TicketProps>();

  const rows = 10;
  const columns = 5;

  const [isOccupied, setIsOccupied] = useState<Array<boolean>>([]);
  const [selectedSeats, setSelectedSeats] = useState<
    { row: number; column: number }[]
  >([]);

  const passengerCount = location?.state?.passengerCount;
  const seatClass = location?.state?.flightData[0].seatClass;

  const isBusinessClass = seatClass === 'business';

  useEffect(() => {
    const fetchAndSetOccupancyData = async () => {
      try {
        const occupancyData = await fetchSeatOccupancyDataFromServer(
          location?.state?.flightData[0].id,
          seatClass
        );
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
  }, [
    rows,
    columns,
    isBusinessClass,
    location?.state?.flightData[0].id,
    location?.state?.flightData[0].seatClass,
  ]);

  const isSeatSelected = (row: number, column: number) => {
    return selectedSeats.some(
      (seat) => seat.row === row && seat.column === column
    );
  };

  const handleSeatClick = (row: number, column: number) => {
    const seatIndex = selectedSeats.findIndex(
      (seat) => seat.row === row && seat.column === column
    );

    if (seatIndex !== -1) {
      const updatedSelectedSeats = [...selectedSeats];
      updatedSelectedSeats.splice(seatIndex, 1);
      setSelectedSeats(updatedSelectedSeats);
    } else {
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

  return (
    <Container>
      <IMGContainer>
        <Seats>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <SeatRow key={rowIndex}>
              {Array.from({ length: columns }, (_, columnIndex) => (
                <React.Fragment key={columnIndex}>
                  {columnToLetter(columnIndex + 1) === 'C' && <Passage />}
                  <SeatButton
                    onClick={() =>
                      handleSeatClick(rowIndex + 1, columnIndex + 1)
                    }
                    isOccupied={isOccupied[rowIndex * columns + columnIndex]}
                    isSelected={isSeatSelected(rowIndex + 1, columnIndex + 1)}
                    disabled={
                      (seatClass === 'economy' && rowIndex == 0) ||
                      (seatClass === 'business' && rowIndex != 0)
                    }
                  >
                    {`${rowIndex + 1}-${columnToLetter(columnIndex + 1)}`}
                  </SeatButton>
                </React.Fragment>
              ))}
            </SeatRow>
          ))}
        </Seats>
      </IMGContainer>
      <StyledLink
        to={{
          pathname: '/PaymentConfirmation',
          state: {
            ...location.state,
            selectedSeats: selectedSeats.map(
              (seat) => `${seat.row}-${columnToLetter(seat.column)}`
            ),
          },
        }}
      >
        <PaymentButton disabled={selectedSeats.length !== passengerCount}>
          결제하기
        </PaymentButton>
      </StyledLink>
    </Container>
  );
}

const fetchSeatOccupancyDataFromServer = async (
  flightId: number | undefined,
  seatClass: string | undefined
) => {
  try {
    const response = await fetch('/api/SeatSelection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        flightId: flightId,
        seatClass: seatClass,
      }),
    });

    if (!response.ok) {
      throw new Error('데이터를 불러오는 데 실패했습니다.');
    }

    const data = await response.json();
    console.log('SeartSelection Data from the server:', data);

    return data; // 서버로부터 받은 좌석 점유 데이터 배열을 반환
  } catch (error: any) {
    console.error('데이터를 가져오는 도중 에러가 발생했습니다:', error.message);
    // 에러 처리 로직 추가
  }
};

const generateInitialIsOccupied = (
  rows: number,
  columns: number,
  isBusinessClass: boolean,
  occupancyData: { seatRow: number; seatLetter: string; available: boolean }[]
) => {
  const initialIsOccupied = Array.from({ length: rows * columns }, () => false);

  if (occupancyData && Array.isArray(occupancyData)) {
    occupancyData.forEach((seat) => {
      const { seatRow, seatLetter, available } = seat;

      console.log(
        `Processing seat: Row ${seatRow}, Letter ${seatLetter}, Available: ${available}`
      );

      if (seatLetter !== undefined) {
        const columnIndex = seatLetter.charCodeAt(0) - 'A'.charCodeAt(0);
        const seatIndex = (seatRow - 1) * columns + columnIndex;

        if (seatIndex >= 0 && seatIndex < rows * columns) {
          if (isBusinessClass && seatRow === 1) {
            initialIsOccupied[seatIndex] = !available; // 반전시킴
          } else if (!isBusinessClass && seatRow >= 2 && seatRow <= 9) {
            initialIsOccupied[seatIndex] = !available; // 반전시킴
          }
        }
      }
    });
  }

  console.log('Final initialIsOccupied:', initialIsOccupied);

  return initialIsOccupied;
};

export default SeatSelection;
