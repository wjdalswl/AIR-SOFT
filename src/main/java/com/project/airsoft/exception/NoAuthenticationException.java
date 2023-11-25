package com.project.airsoft.exception;

import javax.security.sasl.AuthenticationException;

public class NoAuthenticationException extends AuthenticationException {
    public NoAuthenticationException(String s) {
        super(s);
    }
}
