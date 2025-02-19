package com.nhc.CareerNest.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.domain.dto.request.JobCriteriaDTO;
import com.nhc.CareerNest.domain.dto.response.base.RestResponse;
import com.nhc.CareerNest.domain.dto.response.base.ResultPaginationResponse;
import com.nhc.CareerNest.domain.entity.Job;
import com.nhc.CareerNest.service.impl.JobService;
import com.nhc.CareerNest.util.anotation.ApiMessage;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<ResultPaginationResponse> fetchAllJobs(
            JobCriteriaDTO jobCriteriaDTO,
            @RequestParam(defaultValue = "1", name = "page") int page) {
        Pageable pageable = PageRequest.of(page - 1, 6);

        ResultPaginationResponse result = this.jobService.findAllWithSpec(pageable, jobCriteriaDTO);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<RestResponse> fetchJob(@PathVariable("id") Long id) {

        Job job = this.jobService.fetchJobById(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(job);

        return ResponseEntity.ok(res);
    }

    @PostMapping("/jobs")
    public ResponseEntity<RestResponse> createAJob(@Valid @RequestBody Job job) {

        Job newJob = this.jobService.handleSaveJob(job);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(newJob);

        return ResponseEntity.ok(res);
    }

    @PutMapping("/jobs")
    public ResponseEntity<RestResponse> updateAJob(@RequestBody Job job) {
        Job updateJob = this.jobService.handleUpdateJob(job);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(updateJob);

        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<RestResponse> deleteAJob(@PathVariable("id") Long id) {
        this.jobService.DeleteJob(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.ok(res);
    }

    @GetMapping("/jobs/company/{companyId}")
    public ResponseEntity<RestResponse> getJobByCompany(@PathVariable("companyId") Long companyId) {
        List<Job> jobs = this.jobService.fetchJobByCompany(companyId);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(jobs);

        return ResponseEntity.ok(res);
    }
}
