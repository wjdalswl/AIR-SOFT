package com.project.airsoft.repository;

import com.project.airsoft.domain.FlightSchedule;
import com.project.airsoft.domain.Seats;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatsRepository extends JpaRepository<Seats, Long> {

    Seats findByFlightScheduleAndSeatClassAndSeatRowAndSeatLetter(Optional<FlightSchedule> flightSchedule, String seatClass,
                                                                  int seatRow, String seatLetter);

    List<Seats> findAllByFlightScheduleAndSeatClass(FlightSchedule flightSchedule, String seatClass);
}
