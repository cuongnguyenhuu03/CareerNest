package com.nhc.CareerNest.service;

import java.util.List;
import java.util.Optional;

import com.nhc.CareerNest.domain.entity.Company;

public interface ICompanyService {

    Company handleSaveCompany(Company company);

    Company handleUpdateCompany(Company company);

    List<Company> fetchAllCompany();

    Optional<Company> getCompanyById(Long id);

    Company findByName(String name);

    void handleDeleteCompany(Long id);
}
