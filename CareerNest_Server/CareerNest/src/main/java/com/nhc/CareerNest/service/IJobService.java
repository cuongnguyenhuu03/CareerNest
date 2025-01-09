package com.nhc.CareerNest.service;

import java.util.List;

import com.nhc.CareerNest.domain.entity.Job;

public interface IJobService {

    Job handleSaveJob(Job job);

    Job handleUpdateJob(Job job);

    List<Job> fetchAllJob();

    List<Job> fetchJobByCompany(Long id);

    Job fetchJobById(Long id);

    void DeleteJob(Long id);
}
