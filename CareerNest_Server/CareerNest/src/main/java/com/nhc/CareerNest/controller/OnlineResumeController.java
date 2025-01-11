package com.nhc.CareerNest.controller;

import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.domain.dto.response.RestResponse;
import com.nhc.CareerNest.domain.entity.OnlineResume;
import com.nhc.CareerNest.domain.entity.User;
import com.nhc.CareerNest.service.impl.OnlineResumeService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1")
public class OnlineResumeController {

    private final OnlineResumeService onlineResumeService;

    public OnlineResumeController(
            OnlineResumeService onlineResumeService) {
        this.onlineResumeService = onlineResumeService;
    }

    @PostMapping("/online-resumes")
    public ResponseEntity<RestResponse> createOnlineResume(@RequestBody OnlineResume onlineResume) {

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.onlineResumeService.handleSaveOnlineResume(onlineResume));
        res.setMessage("create online resume successfully");

        return ResponseEntity.ok(res);
    }

    @PutMapping("/online-resumes")
    public ResponseEntity<RestResponse> updateOnlineResume(@RequestBody OnlineResume onlineResume) {
        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.onlineResumeService.handleUpdateOnlineResume(onlineResume));
        res.setMessage("update online resume successfully");

        return ResponseEntity.ok(res);
    }

    @GetMapping("/online-resumes/{id}")
    public ResponseEntity<RestResponse> fetchById(@PathVariable("id") Long id) {
        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.onlineResumeService.fetchById(id));
        res.setMessage("fetch resume successfully");

        return ResponseEntity.ok(res);
    }

    @GetMapping("/online-resumes")
    public ResponseEntity<RestResponse> fetchByUser(@RequestBody User user) {
        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.onlineResumeService.fetchByUserId(user));
        res.setMessage("fetch resumes successfully");

        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/online-resumes/{id}")
    public ResponseEntity<RestResponse> deleteOnlineResume(@PathVariable("id") Long id) {

        this.onlineResumeService.deleteOnlineResume(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setMessage("fetch resumes successfully");

        return ResponseEntity.ok(res);
    }

}
