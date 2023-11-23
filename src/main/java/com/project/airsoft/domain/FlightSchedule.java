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
        // seatsList가 null이 아니라면 크기를 반환하고, null이면 0을 반환하도록 처리
        return seatsList != null ? (long) seatsList.size() : 0L;
    }
}
