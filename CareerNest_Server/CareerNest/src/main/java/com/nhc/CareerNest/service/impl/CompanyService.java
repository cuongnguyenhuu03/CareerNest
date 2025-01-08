package com.nhc.CareerNest.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nhc.CareerNest.domain.Company;
import com.nhc.CareerNest.repository.CompanyRepository;
import com.nhc.CareerNest.service.ICompanyService;

@Service
public class CompanyService implements ICompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public Company handleSaveCompany(Company company) {
        return this.companyRepository.save(company);
    }

    @Override
    public Company handleUpdateCompany(Company company) {
        Company updateCompany = this.getCompanyById(company.getId());
        if (updateCompany != null) {
            updateCompany.setName(company.getName());
            updateCompany.setIndustry(company.getIndustry());
            updateCompany.setDescription(company.getDescription());
            updateCompany.setWebsite(company.getWebsite());
            updateCompany.setEmail(company.getEmail());
            updateCompany.setPhone(company.getPhone());
            updateCompany.setAddress(company.getAddress());
            updateCompany.setCountry(company.getCountry());
            updateCompany.setExpertise(company.getExpertise());
            updateCompany.setCity(company.getCity());
            updateCompany.setLogoUrl(company.getLogoUrl());
            updateCompany.setSize(company.getSize());
            updateCompany.setFoundedYear(company.getFoundedYear());
            updateCompany.setSocialLinks(company.getSocialLinks());

            this.companyRepository.save(updateCompany);
        }
        return updateCompany;
    }

    @Override
    public List<Company> fetchAllCompany() {
        return this.companyRepository.findActiveCompany();
    }

    @Override
    public Company getCompanyById(Long id) {
        return this.companyRepository.findById(id).get();
    }

    @Override
    public void handleDeleteCompany(Long id) {
        Company deleteCompany = this.companyRepository.findById(id).get();
        if (deleteCompany != null) {
            deleteCompany.setIsActive(false);
            this.companyRepository.save(deleteCompany);
        }
    }

    @Override
    public Company findByName(String name) {
        return this.companyRepository.findByName(name);
    }

}
