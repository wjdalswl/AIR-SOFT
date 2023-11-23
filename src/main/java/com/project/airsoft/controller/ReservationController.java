package com.project.airsoft.controller;

import com.project.airsoft.repository.FlightScheduleRepository;
import com.project.airsoft.repository.ReservationRepository;
import com.project.airsoft.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ReservationController {

    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;
    private final FlightScheduleRepository flightScheduleRepository;



}
