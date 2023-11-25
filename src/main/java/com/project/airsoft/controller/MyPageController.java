package com.project.airsoft.controller;

import com.project.airsoft.domain.Reservation;
import com.project.airsoft.domain.User;
import com.project.airsoft.dto.MyPageDTO;
import com.project.airsoft.dto.ReservationSearchResponseDTO;
import com.project.airsoft.exception.NoAuthenticationException;
import com.project.airsoft.repository.ReservationRepository;
import com.project.airsoft.repository.SeatsRepository;
import com.project.airsoft.repository.UserRepository;
import com.project.airsoft.security.JwtProvider;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MyPageController {

    private final UserRepository userRepository;
    private final JwtProvider jwtTokenProvider;
    private final ReservationRepository reservationRepository;
    private final SeatsRepository seatsRepository;

    @GetMapping("/my-page")
    @PreAuthorize("hasRole('USER')")
    public MyPageDTO getMyPage(Authentication authentication) throws NoAuthenticationException {

        if (authentication == null) {
            throw new NoAuthenticationException("인증되지 않은 사용자입니다.");
        }

        // 현재 인증된 사용자의 이름을 가져옵니다.
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).get();

        List<Reservation> reservationList = reservationRepository.findAllByUser(user);
        List<ReservationSearchResponseDTO> reservationSearchResponseDTOS = new ArrayList<>();
        for (Reservation reservation : reservationList) {
            reservationSearchResponseDTOS.add(ReservationSearchResponseDTO.builder().
                    id(reservation.getId()).
                    departureDate(reservation.getDepartureDate()).
                    arrivalDate(reservation.getArrivalDate()).
                    passengers(reservation.getPassengers()).
                    seatClass(reservation.getSeatClass()).
                    seatRow(seatsRepository.findById(reservation.getSeatId()).get().getSeatRow()).
                    seatLetter(seatsRepository.findById(reservation.getSeatId()).get().getSeatLetter())
                    .build());
        }

        // 요청한 페이지가 현재 사용자의 페이지인지 확인합니다.
        if (isCurrentUserPage(username)) {
            // 사용자 페이지의 데이터를 가져오고 반환하는 로직을 구현합니다.
//            return ResponseEntity.ok(username + "님, 환영합니다!");
            return MyPageDTO.builder()
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .korName(user.getKorName())
                    .engName(user.getEngName())
                    .birth(user.getBirth())
                    .phone(user.getPhone())
                    .reservations(reservationSearchResponseDTOS)
                    .build();
        } else {
            // 현재 사용자가 다른 사용자의 페이지에 액세스하려고 할 때 권한 없음을 반환합니다.
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to access this page.");
            throw new RuntimeException("인증되지 않은 사용자임");
        }
    }

    private boolean isCurrentUserPage(String username) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.getName().equals(username);
    }
}
