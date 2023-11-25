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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
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

    @PostMapping("/reserve")
    public ResponseEntity<String> reserveFlight(@RequestBody ReservationRequestDTO requestDTO) {
        reservationService.makeReservation(requestDTO);
        return new ResponseEntity<>("Reservation successful", HttpStatus.OK);
    }

    @GetMapping("/search")
    public Reservation searchReservation(@RequestParam String code) {
        return reservationService.searchReservation(code);
    }

//    @GetMapping("/my-page")
//    public ResponseEntity<MyPageDTO> getMyPage(@AuthenticationPrincipal UserDetails userDetails) {
//        // 현재 인증된 사용자의 정보 가져오기
//        String username = userDetails.getUsername();
//
//        // 사용자 정보로 마이페이지 데이터 가져오기
//        User user = userRepository.findByUsername(username).get();
//
//        // 마이페이지 데이터를 MyPageDTO로 변환하여 반환
//        MyPageDTO myPageDTO = new MyPageDTO(user.getUsername(), user.getKorName(), user.getEngName(), user.getBirth(),
//                user.getPhone(), user.getEmail());
//        return ResponseEntity.ok(myPageDTO);
//    }
}
