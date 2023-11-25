package com.project.airsoft.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(SeatAlreadyReservedException.class)
    public ResponseEntity<String> handleSeatAlreadyReservedException(SeatAlreadyReservedException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(NoAuthenticationException.class)
    public ResponseEntity<String> handleNoAuthenticationException(NoAuthenticationException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }
}
