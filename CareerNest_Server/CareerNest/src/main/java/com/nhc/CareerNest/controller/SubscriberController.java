package com.nhc.CareerNest.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.domain.entity.Subscriber;
import com.nhc.CareerNest.exception.errors.IdInvalidException;
import com.nhc.CareerNest.service.impl.SubscriberService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class SubscriberController {
    private final SubscriberService subscriberService;

    public SubscriberController(SubscriberService subscriberService) {
        this.subscriberService = subscriberService;
    }

    @PostMapping("/subscribers")
    public ResponseEntity<Subscriber> createSubsCriber(@Valid @RequestBody Subscriber subs) throws IdInvalidException {
        boolean isExist = this.subscriberService.isExist(subs.getEmail());
        if (isExist) {
            throw new IdInvalidException("email is not valid");
        }
        Subscriber newSubs = this.subscriberService.createSubscriber(subs);
        return ResponseEntity.status(HttpStatus.CREATED).body(newSubs);
    }

    @PutMapping("/subscribers")
    public ResponseEntity<Subscriber> updateSubs(@RequestBody Subscriber subs) throws IdInvalidException {
        Optional<Subscriber> optionalSubs = this.subscriberService.findById(subs.getId());
        if (optionalSubs.isEmpty()) {
            throw new IdInvalidException("id is not valid");
        }
        return ResponseEntity.ok().body(this.subscriberService.updateSubs(subs, optionalSubs.get()));
    }
}
