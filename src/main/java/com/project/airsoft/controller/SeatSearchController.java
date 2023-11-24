package com.project.airsoft.controller;

import com.project.airsoft.domain.Seats;
import com.project.airsoft.dto.SeatStatusRequestDTO;
import com.project.airsoft.dto.SeatStatusResponseDTO;
import com.project.airsoft.service.SeatSearchService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api")
public class SeatSearchController {

    private final SeatSearchService seatSearchService;
    @PostMapping("/SeatSelection")
    public List<SeatStatusResponseDTO> seatSearch(@RequestBody SeatStatusRequestDTO seatStatusRequestDTO) {
        List<Seats> seats =  seatSearchService.seatSearch(seatStatusRequestDTO);
        List<SeatStatusResponseDTO> seatStatus = new ArrayList<>();
        for (Seats seat : seats) {
            SeatStatusResponseDTO responseDTO = SeatStatusResponseDTO.builder().
                    available(seat.isAvailable()).
                    seatRow(seat.getSeatRow()).
                    seatLetter(seat.getSeatLetter()).
                    build();
            seatStatus.add(responseDTO);
        }
        return seatStatus;
    }

}
