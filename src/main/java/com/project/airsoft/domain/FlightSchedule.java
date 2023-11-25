package com.project.airsoft.domain;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDate;
import java.time.LocalDateTime;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlightSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Flight flight;

    private String flightNumber;

    private String departureAirport;

    private String arrivalAirport;

    private LocalDateTime departureTime;

    private LocalDateTime arrivalTime;

    private LocalDate scheduleDate;

    private Long seatsTotal;

    @OneToMany(mappedBy = "flightSchedule")
    private List<Seats> seatsList;

    @OneToMany(mappedBy = "flightSchedule")
    private List<Reservation> reservationList;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "price_id")
    private Price price;

    public Long getSeatsTotal() {
        // available이 true인 좌석만 포함되도록 seatsList를 필터링
        long availableSeats = seatsList != null
                ? seatsList.stream().filter(Seats::isAvailable).count()
                : 0L;

        return availableSeats;
    }
}
