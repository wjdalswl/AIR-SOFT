package com.project.airsoft.dto;

import com.project.airsoft.domain.Reservation;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class MyPageDTO implements Serializable {

    private String username;

    private String korName;

    private String engName;

    private LocalDate birth;

    private String phone;

    private String email;

    private List<ReservationSearchResponseDTO> reservations;
}
