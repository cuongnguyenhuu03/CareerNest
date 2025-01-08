package com.nhc.CareerNest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
// @SpringBootApplication(exclude =
// org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class)
public class CareerNestApplication {

	public static void main(String[] args) {
		SpringApplication.run(CareerNestApplication.class, args);
	}

}
