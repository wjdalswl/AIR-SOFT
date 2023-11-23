package com.project.airsoft.repository;

import com.project.airsoft.domain.Seats;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatsRepository extends JpaRepository<Seats, Long> {
}
