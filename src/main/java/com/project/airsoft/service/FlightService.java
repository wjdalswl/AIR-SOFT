package com.project.airsoft.service;

import com.project.airsoft.domain.Flight;
import com.project.airsoft.domain.FlightSchedule;
import com.project.airsoft.domain.Seats;
import com.project.airsoft.repository.FlightRepository;
import com.project.airsoft.repository.FlightScheduleRepository;
import com.project.airsoft.repository.SeatsRepository;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class FlightService {

    private final FlightRepository flightRepository;
    private final FlightScheduleRepository flightScheduleRepository;
    private final SeatsRepository seatsRepository;

    private static final int batchSize = 20; // Adjust the batch size as needed


    public void processCsv(MultipartFile file, LocalDate startDate, LocalDate endDate) {
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");
                // 배열 길이를 확인하는 체크 추가
                if (data.length == 9) {
                    Flight flight = createFlightFromCsv(data);
                    flightRepository.save(flight);

                    // 저장된 항공편에 대한 일정 생성
                    createFlightSchedules(flight, startDate, endDate);
                } else {
                    // 데이터 배열이 예상된 길이가 아닌 경우에 대한 로깅 또는 처리
                    log.warn("잘못된 데이터 형식: " + line);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }
    }

    private Flight createFlightFromCsv(String[] data) {
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("H:mm");

        return Flight.builder()
                .airline(data[0])
                .flightNumber(data[1])
                .departureAirport(data[2])
                .arrivalAirport(data[3])
                .departureTime(LocalTime.parse(data[4], timeFormatter))
                .arrivalTime(LocalTime.parse(data[5], timeFormatter))
                .operatingDay(data[6])
                .build();
    }

    private void createFlightSchedules(Flight flight, LocalDate startDate, LocalDate endDate) {
        LocalDate currentDate = startDate;

        // Parse the time strings into LocalTime
        LocalTime departureTime = flight.getDepartureTime();
        LocalTime arrivalTime = flight.getArrivalTime();

        while (!currentDate.isAfter(endDate)) {
            if (isOperatingOnDay(flight, currentDate.getDayOfWeek())) {
                FlightSchedule schedule = new FlightSchedule();
                schedule.setFlight(flight);
                schedule.setDepartureAirport(flight.getDepartureAirport());
                schedule.setArrivalAirport(flight.getArrivalAirport());
                schedule.setScheduleDate(currentDate);
                schedule.setDepartureTime(LocalDateTime.of(currentDate, departureTime));
                schedule.setArrivalTime(LocalDateTime.of(currentDate, arrivalTime));
                schedule.setFlightNumber(flight.getFlightNumber());

                // Save the FlightSchedule to the database
                flightScheduleRepository.save(schedule);
                log.info("Flight schedule created for " + currentDate + ": " + schedule);

                //각 스케쥴에 50개 좌석 추가
                addSeatsToSchedule(schedule);

            }
            currentDate = currentDate.plusDays(1); // 하루 간격으로 이동
        }
    }

    private boolean isOperatingOnDay(Flight flight, DayOfWeek dayOfWeek) {
        String operatingDays = flight.getOperatingDay();
        switch (dayOfWeek) {
            case MONDAY:
                return operatingDays.contains("월");
            case TUESDAY:
                return operatingDays.contains("화");
            case WEDNESDAY:
                return operatingDays.contains("수");
            case THURSDAY:
                return operatingDays.contains("목");
            case FRIDAY:
                return operatingDays.contains("금");
            case SATURDAY:
                return operatingDays.contains("토");
            case SUNDAY:
                return operatingDays.contains("일");
            default:
                return false;
        }
    }

    // 추가: 각 스케줄에 50개의 좌석을 추가하는 메서드
    private void addSeatsToSchedule(FlightSchedule schedule) {
        int numSeatsToAdd = 10; // 추가: 각 스케줄당 50개의 좌석
        char[] seatLetters = {'A', 'B', 'C', 'D', 'E'};

        List<Seats> seatsBatch = new ArrayList<>();

        for (int i = 1; i <= numSeatsToAdd; i++) {
            for (char letter : seatLetters) {
                String seatClass = (i == 1) ? "business" : "economy"; // 1열은 "business", 나머지는 "economy"

                Seats seat = Seats.builder()
                        .flightSchedule(schedule)
                        .seatRow(i)
                        .seatLetter(String.valueOf(letter))
                        .available(true)
                        .seatClass(seatClass)
                        .build();

                seatsBatch.add(seat);

                if (seatsBatch.size() % batchSize == 0 || (i == numSeatsToAdd && letter == seatLetters[seatLetters.length - 1])) {
                    // Save the batch to the database
                    seatsRepository.saveAll(seatsBatch);
                    System.out.println("Batch of seats added to schedule: " + seatsBatch.size());
                    seatsBatch.clear();
                }
            }
        }
    }

}

