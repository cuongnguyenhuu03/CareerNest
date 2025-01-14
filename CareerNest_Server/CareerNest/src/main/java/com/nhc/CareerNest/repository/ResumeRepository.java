package com.nhc.CareerNest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nhc.CareerNest.domain.entity.Resume;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {

}
