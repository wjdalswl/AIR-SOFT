package com.project.airsoft.service;

import com.project.airsoft.domain.Flight;
import com.project.airsoft.domain.FlightSchedule;
import com.project.airsoft.repository.FlightRepository;
import com.project.airsoft.repository.FlightScheduleRepository;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FlightService {

    private final FlightRepository flightRepository;
    private final FlightScheduleRepository flightScheduleRepository;

    @Autowired
    public FlightService(FlightRepository flightRepository, FlightScheduleRepository flightScheduleRepository) {
        this.flightRepository = flightRepository;
        this.flightScheduleRepository = flightScheduleRepository;
    }

    public void processCsv(MultipartFile file, LocalDate startDate, LocalDate endDate) {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");

                // Skip header line
                if (data[0].equalsIgnoreCase("항공사")) {
                    continue;
                }

                Flight flight = createFlightFromCsv(data);
                flightRepository.save(flight);

                // Generate schedules for the saved flight
                createFlightSchedules(flight, startDate, endDate);
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

                // Save the FlightSchedule to the database
                flightScheduleRepository.save(schedule);
                System.out.println("Flight schedule created for " + currentDate + ": " + schedule);
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
}

