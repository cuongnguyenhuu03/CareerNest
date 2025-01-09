package com.nhc.CareerNest.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.nhc.CareerNest.domain.entity.Company;
import com.nhc.CareerNest.domain.entity.Job;
import com.nhc.CareerNest.domain.entity.Skill;
import com.nhc.CareerNest.repository.CompanyRepository;
import com.nhc.CareerNest.repository.JobRepository;
import com.nhc.CareerNest.repository.SkillRepository;
import com.nhc.CareerNest.service.IJobService;

@Service
public class JobService implements IJobService {

    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;
    private final SkillRepository skillRepository;

    public JobService(
            SkillRepository skillRepository,
            JobRepository jobRepository,
            CompanyRepository companyRepository) {
        this.skillRepository = skillRepository;
        this.jobRepository = jobRepository;
        this.companyRepository = companyRepository;
    }

    @Override
    public Job handleSaveJob(Job job) {

        // check company
        if (job.getCompany() != null) {
            Optional<Company> comOptional = this.companyRepository.findById(job.getCompany().getId());
            if (comOptional.isPresent()) {
                job.setCompany(comOptional.get());
            }
        }

        // check skill
        if (job.getSkills() != null) {
            List<Long> SkillId = job.getSkills()
                    .stream()
                    .map(skill -> skill.getId())
                    .collect(Collectors.toList());

            List<Skill> skills = this.skillRepository.findByIdIn(SkillId);
            job.setSkills(skills);
        }

        return this.jobRepository.save(job);
    }

    @Override
    public Job handleUpdateJob(Job job) {

        Job updateJob = this.jobRepository.findById(job.getId()).get();

        // check company
        if (job.getCompany() != null) {
            Optional<Company> comOptional = this.companyRepository.findById(job.getCompany().getId());
            if (comOptional.isPresent()) {
                job.setCompany(comOptional.get());
            }
        }

        // check skill
        if (job.getSkills() != null) {
            List<Long> SkillId = job.getSkills()
                    .stream()
                    .map(skill -> skill.getId())
                    .collect(Collectors.toList());

            List<Skill> skills = this.skillRepository.findByIdIn(SkillId);
            job.setSkills(skills);
        }

        if (updateJob != null) {
            updateJob.setName(job.getName());
            updateJob.setLocation(job.getLocation());
            updateJob.setSalary(job.getSalary());
            updateJob.setQuantity(job.getQuantity());
            updateJob.setLevel(job.getLevel());
            updateJob.setDescription(job.getDescription());
            updateJob.setStartDate(job.getStartDate());
            updateJob.setEndDate(job.getEndDate());
            updateJob.setRequirements(job.getRequirements());
            updateJob.setBenefits(job.getBenefits());
            updateJob.setActive(job.isActive());
            updateJob.setCompany((job.getCompany()));

            this.jobRepository.save(updateJob);
        }
        return updateJob;
    }

    @Override
    public List<Job> fetchAllJob() {
        return this.jobRepository.findAll();
    }

    @Override
    public List<Job> fetchJobByCompany(Long companyId) {
        Company company = this.companyRepository.findById(companyId).get();
        return this.jobRepository.findByCompany(company);
    }

    @Override
    public Job fetchJobById(Long id) {
        return this.jobRepository.findById(id).get();
    }

    @Override
    public void DeleteJob(Long id) {
        Job deleteJob = this.jobRepository.findById(id).get();
        if (deleteJob != null) {
            deleteJob.setActive(false);
            this.jobRepository.save(deleteJob);
        }
    }

}
