package com.project.airsoft.controller;

import com.project.airsoft.domain.FlightSchedule;
import com.project.airsoft.dto.FlightSearchResponseDTO;
import com.project.airsoft.service.FlightSearchService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class FlightSearchController {

    private final FlightSearchService flightSearchService;

    @GetMapping("FlightSelect")
    public List<FlightSearchResponseDTO> flightSearch(@RequestParam("departure") String departureAirport,
                                                                @RequestParam("destination") String arrivalAirport,
                                                                @RequestParam("date") String date,
                                                                @RequestParam(name = "seatClass", required = false) String seatClass) {

        List<FlightSchedule> flights = flightSearchService.searchFlights(departureAirport, arrivalAirport, date, seatClass);

        // 조회 결과를 FlightSearchResponseDTO로 변환하여 응답합니다.
        return convertToResponseDTO(flights, seatClass);
    }

    private List<FlightSearchResponseDTO> convertToResponseDTO(List<FlightSchedule> flights, String seatClass) {
        List<FlightSearchResponseDTO> responseDTOList = new ArrayList<>();

        for (FlightSchedule flightSchedule : flights) {
            FlightSearchResponseDTO responseDTO = FlightSearchResponseDTO.builder()
                    .id(flightSchedule.getId())
                    .flightNumber(flightSchedule.getFlightNumber())
                    .departureTime(flightSchedule.getDepartureTime())
                    .departureAirport(flightSchedule.getDepartureAirport())
                    .arrivalTime(flightSchedule.getArrivalTime())
                    .arrivalAirport(flightSchedule.getArrivalAirport())
                    .seatsTotal(flightSchedule.getSeatsTotal())
                    .seatClass(seatClass)  // 예시로 Economy로 고정, 실제로는 seatClass 값이 어떻게 지정되는지에 따라 수정
                    .build();

            responseDTOList.add(responseDTO);
        }

        return responseDTOList;
    }

}
