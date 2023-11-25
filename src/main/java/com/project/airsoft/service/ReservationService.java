package com.project.airsoft.service;

import com.project.airsoft.domain.FlightSchedule;
import com.project.airsoft.domain.Reservation;
import com.project.airsoft.domain.Seats;
import com.project.airsoft.domain.User;
import com.project.airsoft.dto.ReservationRequestDTO;
import com.project.airsoft.dto.ReservationSearchResponseDTO;
import com.project.airsoft.exception.SeatAlreadyReservedException;
import com.project.airsoft.repository.FlightScheduleRepository;
import com.project.airsoft.repository.ReservationRepository;
import com.project.airsoft.repository.SeatsRepository;
import com.project.airsoft.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationService {

    private final UserRepository userRepository;
    private final FlightScheduleRepository flightScheduleRepository;
    private final SeatsRepository seatsRepository;
    private final ReservationRepository reservationRepository;



    @Transactional
    public void makeReservation(ReservationRequestDTO reservationRequestDTO) {
        // 예약을 위한 사용자 및 항공 스케줄, 좌석 정보 가져오기
        Optional<User> user = userRepository.findById(reservationRequestDTO.getUserId());

        Optional<FlightSchedule> flightSchedule = flightScheduleRepository.findById(reservationRequestDTO.getFlightId());

        String seatClass = reservationRequestDTO.getSeatClass();

        int passengers = reservationRequestDTO.getPassengers();

        List<Integer> seatRowList = new ArrayList<>();

        List<String> seatLetterList = new ArrayList<>();

        for (String item : reservationRequestDTO.getSelectedSeats()) {
            String[] parts = item.split("-");
            int number = Integer.parseInt(parts[0]);
            String character = parts[1];

            // 리스트에 추가
            seatRowList.add(number);
            seatLetterList.add(character);
        }

//        int seatRow = reservationRequestDTO.getSeatRow();
//
//        String seatLetter = reservationRequestDTO.getSeatLetter();


        for(int i = 0; i<seatRowList.size(); i++) {
            System.out.println(seatRowList.get(i));
            System.out.println(seatLetterList.get(i));
            Seats seat = seatsRepository.findByFlightScheduleAndSeatClassAndSeatRowAndSeatLetter(flightSchedule,
                    seatClass,
                    seatRowList.get(i), seatLetterList.get(i));
            // 좌석이 이미 예약되었는지 확인
            if (!seat.isAvailable()) {
                throw new SeatAlreadyReservedException("좌석 " + seatRowList.get(i) + "-" + seatLetterList.get(i) + "은(는) 이미 예약되었습니다.");
            }

            // 예약 생성 및 저장
            Reservation reservation = Reservation.builder()
                    .departureDate(flightSchedule.get().getScheduleDate())
                    .arrivalDate(flightSchedule.get().getScheduleDate())
                    .passengers(passengers)
                    .seatClass(seatClass)
                    .seatId(seat.getId())
//                .price(calculatePrice(flightSchedule.get().getPrice(), seatClass, passengers))
                    .user(user.get())
                    .flightSchedule(flightSchedule.get())
                    .build();

            reservation = reservationRepository.save(reservation);

            // 좌석 상태 업데이트
            seat.setAvailable(false);
            seat.setUser_id(user.get().getId());
            seatsRepository.save(seat);
        }

        // 예약된 좌석 수 업데이트
        flightSchedule.get().setSeatsTotal(flightSchedule.get().getSeatsTotal() - passengers);
        flightScheduleRepository.save(flightSchedule.get());
    }

    public Reservation searchReservation(String code) {
        return reservationRepository.findById(code);
    }

    public Reservation searchReservation(User user) {
        return reservationRepository.findByUser(user);
    }
}
