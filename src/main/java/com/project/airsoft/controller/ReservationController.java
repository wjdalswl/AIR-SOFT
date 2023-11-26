package com.project.airsoft.controller;

import com.project.airsoft.domain.Reservation;
import com.project.airsoft.domain.User;
import com.project.airsoft.dto.ReservationRequestDTO;
import com.project.airsoft.repository.UserRepository;
import com.project.airsoft.service.ReservationService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    public ResponseEntity<String> reserveFlight(Authentication authentication,
                                                @RequestBody ReservationRequestDTO requestDTO) {
        String name = authentication.getName();
        Long id = userRepository.findByUsername(name).get().getId();
        reservationService.makeReservation(requestDTO, id);
        return new ResponseEntity<>("예약이 완료되었습니다.", HttpStatus.OK);
    }

    @GetMapping("/search")
    public Reservation searchReservation(@RequestParam String code) {
        return reservationService.searchReservation(code);
    }

    @GetMapping("/cancel/{reservation_id}")
    public ResponseEntity<String> cancelFlight(@PathVariable String reservation_id) {
        reservationService.cancelReservation(reservation_id);
        return new ResponseEntity<>("취소가 완료되었습니다.", HttpStatus.OK);
    }
}
