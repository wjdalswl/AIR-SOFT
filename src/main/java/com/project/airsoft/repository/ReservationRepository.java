package com.project.airsoft.repository;

import com.project.airsoft.domain.Reservation;
import com.project.airsoft.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Reservation findByUser(User user);

    Reservation findById(String id);
}
