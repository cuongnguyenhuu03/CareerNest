package com.nhc.CareerNest.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.util.anotation.ApiMessage;

@RestController
public class HelloController {

    @GetMapping("/")
    @ApiMessage("Hello world")
    public String helloWorld() {
        return "Hello";
    }

}
