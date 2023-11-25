package com.project.airsoft.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class FlightSearchResponseDTO {

    private Long id;

    private String flightNumber;

    private String departureDate;

    private LocalDateTime departureTime;

    private String departureAirport;

    private LocalDateTime arrivalTime;

    private String arrivalAirport;

    private Long seatsTotal;

    private String seatClass;
}
