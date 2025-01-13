package com.nhc.CareerNest.util.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.nhc.CareerNest.domain.dto.response.RestResponse;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<RestResponse> handleAllException(Exception ex) {

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        res.setMessage(ex.getMessage());
        res.setError("Internal Server Error");

        return ResponseEntity.badRequest().body(res);
    }

    @ExceptionHandler(value = {
            IdInvalidException.class,
            BadCredentialsException.class
    })
    public ResponseEntity<RestResponse> handleBadRequest(IdInvalidException ex) {
        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        res.setMessage(ex.getMessage());
        res.setError("Bad request");

        return ResponseEntity.badRequest().body(res);
    }

    @ExceptionHandler(value = {
            StorageException.class
    })
    public ResponseEntity<RestResponse> handleFileUploadException(Exception ex) {

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        res.setError(ex.getMessage());
        res.setMessage("Exception upload file");

        return ResponseEntity.badRequest().body(res);
    }

    @ExceptionHandler(value = {
            NoResourceFoundException.class,
    })
    public ResponseEntity<RestResponse> handleNotFoundException(Exception ex) {

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.NOT_FOUND.value());
        res.setError(ex.getMessage());
        res.setMessage("404 Not Found. URL may not exist...");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

}
