package com.project.airsoft.service;

import com.project.airsoft.domain.FlightSchedule;
import com.project.airsoft.repository.FlightScheduleRepository;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FlightSearchService {

    private final FlightScheduleRepository flightScheduleRepository;

    public List<FlightSchedule> searchFlights(String departureAirport,
                                              String arrivalAirport,
                                              String date,
                                              String seatClass) {

        return flightScheduleRepository.findByDepartureAirportAndArrivalAirportAndScheduleDate(departureAirport, arrivalAirport, LocalDate.parse(date));
    }
}
