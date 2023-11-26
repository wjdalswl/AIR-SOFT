package com.project.airsoft.exception;

import java.io.IOException;

public class FlightCreateException extends RuntimeException{
    public FlightCreateException(String s) {
        super(s);
    }

    public FlightCreateException(String s, IOException e) {
        super(s, e);
    }
}
