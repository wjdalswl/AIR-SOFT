package com.project.airsoft.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.io.Serializable;
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
public class FlightSchedule implements Serializable {

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
    @JsonManagedReference
    private List<Seats> seatsList;

    @OneToMany(mappedBy = "flightSchedule")
    @JsonIgnore
    private List<Reservation> reservationList;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "price_id")
    private Price price;

    public Long getSeatsTotal(String seatClass) {

        if(seatClass.equals("economy")) {
            return seatsList.stream()
                    .filter(seat -> seat.getSeatClass().equals("economy") && seat.isAvailable())
                    .count();
        } else if (seatClass.equals("business")) {
            return seatsList.stream()
                    .filter(seat -> seat.getSeatClass().equals("business") && seat.isAvailable())
                    .count();
        } else {
            return 0L;
        }
    }
}
