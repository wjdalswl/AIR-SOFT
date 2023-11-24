package com.project.airsoft.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
public class SeatStatusResponseDTO {

    private boolean available;

    private int seatRow;

    private String seatLetter;

}
