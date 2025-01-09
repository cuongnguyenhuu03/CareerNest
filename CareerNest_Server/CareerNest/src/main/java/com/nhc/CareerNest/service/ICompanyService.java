package com.nhc.CareerNest.service;

import java.util.List;

import com.nhc.CareerNest.domain.entity.Company;

public interface ICompanyService {

    Company handleSaveCompany(Company company);

    Company handleUpdateCompany(Company company);

    List<Company> fetchAllCompany();

    Company getCompanyById(Long id);

    Company findByName(String name);

    void handleDeleteCompany(Long id);
}
