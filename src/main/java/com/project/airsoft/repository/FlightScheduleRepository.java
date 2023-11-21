package com.project.airsoft.repository;

import com.project.airsoft.domain.FlightSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightScheduleRepository extends JpaRepository<FlightSchedule, Long> {
}
