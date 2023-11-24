package com.project.airsoft.controller;

import com.project.airsoft.dto.ReservationRequestDTO;
import com.project.airsoft.repository.FlightScheduleRepository;
import com.project.airsoft.repository.ReservationRepository;
import com.project.airsoft.repository.UserRepository;
import com.project.airsoft.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/reserve")
    public ResponseEntity<String> reserveFlight(@RequestBody ReservationRequestDTO requestDTO) {
        reservationService.makeReservation(requestDTO);
        return new ResponseEntity<>("Reservation successful", HttpStatus.OK);
    }
}
