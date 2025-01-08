package com.nhc.CareerNest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.domain.Company;
import com.nhc.CareerNest.domain.response.RestResponse;
import com.nhc.CareerNest.service.impl.CompanyService;
import com.nhc.CareerNest.util.anotation.ApiMessage;
import com.nhc.CareerNest.util.exception.IdInvalidException;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping("/companies")
    @ApiMessage("create a new company")
    public RestResponse handleCreateACompany(@RequestBody Company company) throws IdInvalidException {
        Company newCompany = this.companyService.findByName(company.getName());
        if (newCompany != null) {
            throw new IdInvalidException("This Company name already exists");
        }
        newCompany = this.companyService.handleSaveCompany(company);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.CREATED.value());
        res.setData(newCompany);
        res.setMessage("create a new company successfully");
        return res;
    }

    @GetMapping("/companies/{id}")
    @ApiMessage("fetch a company")
    public RestResponse fetchACompany(@PathVariable("id") Long id) {
        Company company = this.companyService.getCompanyById(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(company);
        res.setMessage("Fetch a new company successfully");
        return res;
    }

    @PutMapping("companies")
    @ApiMessage("Update a company")
    public RestResponse handleUpdateCompany(@RequestBody Company company) {
        Company updateCompany = this.companyService.handleUpdateCompany(company);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(updateCompany);
        res.setMessage("Update a company successfully");
        return res;
    }

    @DeleteMapping("companies/{id}")
    @ApiMessage("Delete a company")
    public RestResponse handleDeleteCompany(@PathVariable("id") Long id) {
        this.companyService.handleDeleteCompany(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setMessage("Delete a company successfully");
        return res;
    }

    @GetMapping("/companies")
    public RestResponse fetchAllCompany() {
        List<Company> companies = this.companyService.fetchAllCompany();

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(companies);
        res.setMessage("Fetch all company successfully");
        return res;
    }

}
