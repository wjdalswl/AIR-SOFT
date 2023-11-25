package com.project.airsoft.controller;

import com.project.airsoft.domain.Reservation;
import com.project.airsoft.domain.User;
import com.project.airsoft.dto.MyPageDTO;
import com.project.airsoft.dto.ReservationRequestDTO;
import com.project.airsoft.dto.ReservationSearchResponseDTO;
import com.project.airsoft.repository.FlightScheduleRepository;
import com.project.airsoft.repository.ReservationRepository;
import com.project.airsoft.repository.UserRepository;
import com.project.airsoft.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;
    private final UserRepository userRepository;

    @PostMapping("/reserve")
    public ResponseEntity<String> reserveFlight(@RequestBody ReservationRequestDTO requestDTO) {
        reservationService.makeReservation(requestDTO);
        return new ResponseEntity<>("예약이 완료되었습니다.", HttpStatus.OK);
    }

    @GetMapping("/search")
    public Reservation searchReservation(@RequestParam String code) {
        return reservationService.searchReservation(code);
    }

    @GetMapping("/cancel")
    public ResponseEntity<String> cancelFlight(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).get();
        return null;

    }

    @GetMapping("/cancel/{reservation_id}")
    public ResponseEntity<String> cancelFlight(@PathVariable String reservation_id) {
        reservationService.cancelReservation(reservation_id);
        return new ResponseEntity<>("취소가 완료되었습니다.", HttpStatus.OK);
    }
}
