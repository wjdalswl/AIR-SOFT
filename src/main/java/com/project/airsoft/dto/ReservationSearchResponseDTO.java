package com.project.airsoft.dto;

import java.time.LocalDate;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReservationSearchResponseDTO {

    @Id
    private String id;

    private LocalDate departureDate;

    private LocalDate arrivalDate;

    private int passengers;

    private String seatClass;

    private int seatRow;

    private String seatLetter;

    private int price;


}
