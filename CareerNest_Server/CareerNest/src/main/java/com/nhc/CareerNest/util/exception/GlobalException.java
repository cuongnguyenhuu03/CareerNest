package com.nhc.CareerNest.util.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.nhc.CareerNest.domain.dto.response.RestResponse;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(Exception.class)
    public RestResponse handleAllException(Exception ex) {
        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        res.setMessage(ex.getMessage());
        res.setError("Internal Server Error");
        return res;
    }

    @ExceptionHandler(value = {
            IdInvalidException.class,
            BadCredentialsException.class
    })
    public RestResponse handleBadRequest(IdInvalidException ex) {
        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        res.setMessage(ex.getMessage());
        res.setError("Bad request");
        return res;
    }

}
