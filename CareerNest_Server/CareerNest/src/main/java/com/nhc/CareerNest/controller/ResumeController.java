package com.nhc.CareerNest.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.domain.dto.response.RestResponse;
import com.nhc.CareerNest.domain.dto.response.resume.ResFetchResumeDTO;
import com.nhc.CareerNest.domain.dto.response.resume.ResUpdateResumeDTO;
import com.nhc.CareerNest.domain.entity.Resume;
import com.nhc.CareerNest.service.impl.ResumeService;
import com.nhc.CareerNest.util.anotation.ApiMessage;
import com.nhc.CareerNest.util.exception.IdInvalidException;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class ResumeController {

    private final ResumeService resumeService;
    // private final UserService userService;

    public ResumeController(
            ResumeService resumeService
    // UserService userService
    ) {
        this.resumeService = resumeService;
        // this.userService = userService;

    }

    @PostMapping("resumes")
    @ApiMessage("create a resume")
    public ResponseEntity<RestResponse> createResume(@Valid @RequestBody Resume resume)
            throws IdInvalidException {
        boolean isExist = this.resumeService.checkResumeExistByUserAndJob(resume);
        if (!isExist) {
            throw new IdInvalidException("Job/User not exist");
        }

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.resumeService.createResume(resume));
        res.setMessage("Fetch all jobs successfully");

        return ResponseEntity.ok(res);
    }

    @GetMapping("resumes/{id}")
    @ApiMessage("get a resume by id")
    public ResponseEntity<ResFetchResumeDTO> fetchResume(@PathVariable Long id) throws IdInvalidException {
        Optional<Resume> optionalResume = this.resumeService.fetchResume(id);
        if (optionalResume.isEmpty()) {
            throw new IdInvalidException("resume with id: " + id + " not exist");
        } else {
            return ResponseEntity.ok().body(this.resumeService.getResume(optionalResume.get()));
        }
    }

    @PutMapping("resumes")
    @ApiMessage("update a resume")
    public ResponseEntity<ResUpdateResumeDTO> updateResume(@RequestBody Resume resume) throws IdInvalidException {
        Optional<Resume> optionalResume = this.resumeService.fetchResume(resume.getId());
        if (optionalResume.isEmpty()) {
            throw new IdInvalidException("resume with id: " + resume.getId() + " not exist");
        } else {
            Resume updateResume = optionalResume.get();
            updateResume.setStatus(resume.getStatus());
            return ResponseEntity.ok().body(this.resumeService.update(updateResume));
        }
    }

    @DeleteMapping("resumes/{id}")
    @ApiMessage("delete a resume with id")
    public void deleteResume(@PathVariable("id") long id) throws IdInvalidException {
        Optional<Resume> optionalResume = this.resumeService.fetchResume(id);
        if (optionalResume.isEmpty()) {
            throw new IdInvalidException("resume with id: " + id + " not exist");
        } else {
            this.resumeService.deleteResume(id);
        }
    }
}
