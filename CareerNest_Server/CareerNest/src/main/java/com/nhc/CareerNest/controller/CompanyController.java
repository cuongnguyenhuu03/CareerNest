package com.nhc.CareerNest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.config.language.LocalizationUtils;
import com.nhc.CareerNest.constant.MessageKeys;
import com.nhc.CareerNest.domain.dto.response.base.RestResponse;
import com.nhc.CareerNest.domain.entity.Company;
import com.nhc.CareerNest.exception.errors.IdInvalidException;
import com.nhc.CareerNest.service.impl.CompanyService;
import com.nhc.CareerNest.util.anotation.ApiMessage;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1")
public class CompanyController {

    private final CompanyService companyService;
    private final LocalizationUtils localizationUtils;

    public CompanyController(
            LocalizationUtils localizationUtils,
            CompanyService companyService) {
        this.companyService = companyService;
        this.localizationUtils = localizationUtils;
    }

    @PostMapping("/companies")
    @ApiMessage("create a new company")
    public ResponseEntity<RestResponse> handleCreateACompany(@RequestBody Company company) throws IdInvalidException {
        Company newCompany = this.companyService.findByName(company.getName());
        if (newCompany != null) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.COMPANY_ALREADY_EXIST));
        }
        newCompany = this.companyService.handleSaveCompany(company);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.CREATED.value());
        res.setData(newCompany);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/companies/{id}")
    @ApiMessage("fetch a company")
    public ResponseEntity<RestResponse> fetchACompany(@PathVariable("id") Long id) {
        Company company = this.companyService.getCompanyById(id).get();

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(company);

        return ResponseEntity.ok(res);
    }

    @PutMapping("companies")
    @ApiMessage("Update a company")
    public ResponseEntity<RestResponse> handleUpdateCompany(@RequestBody Company company) {
        Company updateCompany = this.companyService.handleUpdateCompany(company);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(updateCompany);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("companies/{id}")
    @ApiMessage("Delete a company")
    public ResponseEntity<RestResponse> handleDeleteCompany(@PathVariable("id") Long id) {
        this.companyService.handleDeleteCompany(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        return ResponseEntity.ok(res);
    }

    @GetMapping("/companies")
    public ResponseEntity<RestResponse> fetchAllCompany() {
        List<Company> companies = this.companyService.fetchAllCompany();

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(companies);
        return ResponseEntity.ok(res);
    }

}
