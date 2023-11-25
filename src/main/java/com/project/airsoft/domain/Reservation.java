package com.project.airsoft.domain;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import java.time.LocalDate;
import javax.persistence.PrePersist;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Reservation {

    @Id
    private String id;

    private LocalDate departureDate;

    private LocalDate arrivalDate;

    private int passengers;

    private String seatClass;

    private Long seatId;

    private int price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private FlightSchedule flightSchedule;

    @PrePersist
    public void generateId() {
        if (this.id != null) {
            throw new RuntimeException("id가 있는 경우엔 새로운 id를 생성할 수 없습니다.");
        }
        this.id = RandomStringUtils.randomAlphanumeric(6);
    }
}
