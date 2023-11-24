package com.project.airsoft.repository;

import com.project.airsoft.domain.FlightSchedule;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface FlightScheduleRepository extends JpaRepository<FlightSchedule, Long> {

    List<FlightSchedule> findByDepartureAirportAndArrivalAirportAndScheduleDate(String departureAirport, String arrivalAirport, LocalDate scheduleDate);

    // 해당 항공 스케줄의 좌석이 예약 가능한지 확인
    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN false ELSE true END " +
            "FROM Seats s WHERE s.flightSchedule.id = :flightId AND s.id = :seatNum")
    boolean isSeatAvailable(@Param("flightId") Long flightId, @Param("seatNum") Long seatNum);

    // 해당 항공 스케줄의 좌석 예약 상태 업데이트
    @Modifying
    @Transactional
    @Query("UPDATE Seats s SET s.available = :isAvailable " +
            "WHERE s.flightSchedule.id = :flightId AND s.id = :seatNum")
    void updateSeatAvailability(
            @Param("flightId") Long flightId,
            @Param("seatNum") Long seatNum,
            @Param("isAvailable") boolean isAvailable);


}
