package com.nhc.CareerNest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nhc.CareerNest.domain.entity.Role;
import com.nhc.CareerNest.util.constant.RoleEnum;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    boolean existsByName(RoleEnum name);

    Role findByName(RoleEnum name);
}
