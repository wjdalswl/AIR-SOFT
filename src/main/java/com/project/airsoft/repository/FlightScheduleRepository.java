package com.project.airsoft.repository;

import com.project.airsoft.domain.FlightSchedule;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightScheduleRepository extends JpaRepository<FlightSchedule, Long> {

    List<FlightSchedule> findByDepartureAirportAndArrivalAirportAndScheduleDate(String departureAirport, String arrivalAirport, LocalDate scheduleDate);
}
