package com.nhc.CareerNest.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.service.impl.SubscriberService;
import com.nhc.CareerNest.util.anotation.ApiMessage;

@RestController
@RequestMapping("/api/v1")
public class EmailController {

    private final SubscriberService subscriberService;

    public EmailController(
            SubscriberService subscriberService) {
        this.subscriberService = subscriberService;
    }

    @GetMapping("/emails")
    @ApiMessage("Send simple email")
    // @Scheduled(cron = "0 0 0 1W * *")
    // @Transactional
    public String sendSimpleEmail() {
        this.subscriberService.sendSubscribersEmailJobs();
        return new String();
    }

}
