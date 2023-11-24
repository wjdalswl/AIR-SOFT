package com.project.airsoft.service;

import com.project.airsoft.domain.FlightSchedule;
import com.project.airsoft.domain.Seats;
import com.project.airsoft.dto.SeatStatusRequestDTO;
import com.project.airsoft.repository.FlightScheduleRepository;
import com.project.airsoft.repository.SeatsRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SeatSearchService {

    private final SeatsRepository seatsRepository;
    private final FlightScheduleRepository flightScheduleRepository;

    @Transactional
    public List<Seats> seatSearch(SeatStatusRequestDTO seatStatusRequestDTO) {
        Long flightId = seatStatusRequestDTO.getFlightId();
        String seatClass = seatStatusRequestDTO.getSeatClass();

        FlightSchedule flightSchedule = flightScheduleRepository.findById(flightId).get();

        return seatsRepository.findAllByFlightScheduleAndSeatClass(flightSchedule, seatClass);
    }
}
