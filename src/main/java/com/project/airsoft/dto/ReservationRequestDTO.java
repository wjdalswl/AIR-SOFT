package com.project.airsoft.dto;

import com.project.airsoft.domain.FlightSchedule;
import com.project.airsoft.domain.Reservation;
import com.project.airsoft.domain.User;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReservationRequestDTO {

    private Long userId = 1L;

    private Long flightId;

    private String seatClass;

    private int passengers;

    private List<String> selectedSeats;

//    private int seatRow;
//
//    private String seatLetter;

}
