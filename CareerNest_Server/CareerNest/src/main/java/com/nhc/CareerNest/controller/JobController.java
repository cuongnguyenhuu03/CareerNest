package com.nhc.CareerNest.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.domain.dto.response.RestResponse;
import com.nhc.CareerNest.domain.entity.Job;
import com.nhc.CareerNest.service.impl.JobService;
import com.nhc.CareerNest.util.anotation.ApiMessage;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping("/jobs")
    @ApiMessage("fetch all jobs")
    public ResponseEntity<RestResponse> fetchAllJobs() {
        List<Job> jobs = this.jobService.fetchAllJob();

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(jobs);
        res.setMessage("Fetch all jobs successfully");

        return ResponseEntity.ok(res);
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<RestResponse> fetchJob(@PathVariable("id") Long id) {

        Job job = this.jobService.fetchJobById(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(job);
        res.setMessage("Fetch all jobs successfully");

        return ResponseEntity.ok(res);
    }

    @PostMapping("/jobs")
    public ResponseEntity<RestResponse> createAJob(@RequestBody Job job) {

        Job newJob = this.jobService.handleSaveJob(job);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(newJob);
        res.setMessage("create a job successfully");

        return ResponseEntity.ok(res);
    }

    @PutMapping("/jobs")
    public ResponseEntity<RestResponse> updateAJob(@RequestBody Job job) {
        Job updateJob = this.jobService.handleUpdateJob(job);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(updateJob);
        res.setMessage("update a job successfully");

        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<RestResponse> deleteAJob(@PathVariable("id") Long id) {
        this.jobService.DeleteJob(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setMessage("delete a job successfully");

        return ResponseEntity.ok(res);
    }

    @GetMapping("/jobs/company/{companyId}")
    public ResponseEntity<RestResponse> getJobByCompany(@PathVariable("companyId") Long companyId) {
        List<Job> jobs = this.jobService.fetchJobByCompany(companyId);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(jobs);
        res.setMessage("Fetch jobs successfully");

        return ResponseEntity.ok(res);
    }

}
