package com.project.airsoft.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    private String departureAirport;

    private String arrivalAirport;

    private LocalDateTime departureTime;

    private LocalDateTime arrivalTime;

    private int passengers;

    private String seatClass;

    private int seatRow;

    private String seatLetter;

    private int price;


}
