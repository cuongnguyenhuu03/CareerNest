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

import com.nhc.CareerNest.config.language.LocalizationUtils;
import com.nhc.CareerNest.constant.MessageKeys;
import com.nhc.CareerNest.domain.dto.response.base.RestResponse;
import com.nhc.CareerNest.domain.entity.Resume;
import com.nhc.CareerNest.exception.errors.IdInvalidException;
import com.nhc.CareerNest.service.impl.ResumeService;
import com.nhc.CareerNest.util.anotation.ApiMessage;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class ResumeController {

    private final ResumeService resumeService;
    private final LocalizationUtils localizationUtils;
    // private final UserService userService;

    public ResumeController(
            ResumeService resumeService,
            LocalizationUtils localizationUtils
    // UserService userService
    ) {
        this.localizationUtils = localizationUtils;
        this.resumeService = resumeService;
        // this.userService = userService;

    }

    @PostMapping("resumes")
    @ApiMessage("create a resume")
    public ResponseEntity<RestResponse> createResume(@Valid @RequestBody Resume resume)
            throws IdInvalidException {
        boolean isExist = this.resumeService.checkResumeExistByUserAndJob(resume);
        if (!isExist) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.RESUME_DATA_NOT_FOUND));
        }

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.resumeService.createResume(resume));

        return ResponseEntity.ok(res);
    }

    @GetMapping("resumes/{id}")
    @ApiMessage("get a resume by id")
    public ResponseEntity<RestResponse> fetchResume(@PathVariable Long id) throws IdInvalidException {
        Optional<Resume> optionalResume = this.resumeService.fetchResume(id);
        if (optionalResume.isEmpty()) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.RESUME_NOT_FOUND));
        } else {
            RestResponse res = new RestResponse();
            res.setStatusCode(HttpStatus.OK.value());
            res.setData(this.resumeService.getResume(optionalResume.get()));

            return ResponseEntity.ok(res);
        }
    }

    @PutMapping("resumes")
    @ApiMessage("update a resume")
    public ResponseEntity<RestResponse> updateResume(@RequestBody Resume resume) throws IdInvalidException {
        Optional<Resume> optionalResume = this.resumeService.fetchResume(resume.getId());
        if (optionalResume.isEmpty()) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.RESUME_NOT_FOUND));
        } else {
            Resume updateResume = optionalResume.get();
            updateResume.setStatus(resume.getStatus());

            RestResponse res = new RestResponse();
            res.setStatusCode(HttpStatus.OK.value());
            res.setData(this.resumeService.update(updateResume));

            return ResponseEntity.ok(res);
        }
    }

    @DeleteMapping("resumes/{id}")
    @ApiMessage("delete a resume with id")
    public void deleteResume(@PathVariable("id") long id) throws IdInvalidException {
        Optional<Resume> optionalResume = this.resumeService.fetchResume(id);
        if (optionalResume.isEmpty()) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.RESUME_NOT_FOUND));
        } else {
            this.resumeService.deleteResume(id);
        }
    }
}
