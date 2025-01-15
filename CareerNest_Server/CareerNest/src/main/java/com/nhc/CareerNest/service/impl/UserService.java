package com.nhc.CareerNest.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nhc.CareerNest.domain.dto.response.user.ResCreateUserDTO;
import com.nhc.CareerNest.domain.dto.response.user.ResUpdateUserDTO;
import com.nhc.CareerNest.domain.dto.response.user.ResUserDTO;
import com.nhc.CareerNest.domain.entity.Company;
import com.nhc.CareerNest.domain.entity.Role;
import com.nhc.CareerNest.domain.entity.User;
import com.nhc.CareerNest.repository.UserRepository;
import com.nhc.CareerNest.service.IUserService;
import com.nhc.CareerNest.util.constant.UserStatusEnum;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final CompanyService companyService;

    public UserService(
            RoleService roleService,
            CompanyService companyService,
            UserRepository userRepository) {
        this.userRepository = userRepository;
        this.companyService = companyService;
        this.roleService = roleService;
    }

    @Override
    public User handleSaveUser(User user) {

        // check company
        if (user.getCompany() != null) {
            Optional<Company> company = this.companyService.getCompanyById(user.getCompany().getId());
            user.setCompany(company.isPresent() ? company.get() : null);
        }
        // check role
        if (user.getRole() != null) {
            Role r = this.roleService.fetchById(user.getRole().getId());
            user.setRole(r != null ? r : null);
        }

        return this.userRepository.save(user);
    }

    @Override
    public List<User> fetchAllUser() {
        return this.userRepository.findActiveUsers();
    }

    @Override
    public void deleteUser(Long id) {

    }

    @Override
    public User updateUser(User user) {

        User updateUser = this.userRepository.findById(user.getId()).get();
        // check company
        if (user.getCompany() != null) {
            Optional<Company> company = this.companyService.getCompanyById(user.getCompany().getId());
            updateUser.setCompany(company.isPresent() ? company.get() : null);
        }

        updateUser.setFirstName(user.getFirstName());
        updateUser.setLastName(user.getLastName());
        updateUser.setDateOfBirth(user.getDateOfBirth());
        updateUser.setGender(user.getGender());
        updateUser.setBlocked(user.getIsBlocked());

        return this.userRepository.save(updateUser);

    }

    @Override
    public boolean isEmailExist(String email) {
        return this.userRepository.existsByEmail(email);
    }

    @Override
    public User findUserById(Long id) {
        return this.userRepository.findById(id).get();
    }

    public ResCreateUserDTO convertToResCreateUserDTO(User user) {
        ResCreateUserDTO res = new ResCreateUserDTO();

        res.setId(user.getId());
        res.setEmail(user.getEmail());
        res.setFirstName(user.getFirstName());
        res.setLastName(user.getLastName());
        res.setDateOfBirth(user.getDateOfBirth());
        res.setGender(user.getGender());
        res.setAddress(user.getAddress());
        res.setCompany(user.getCompany());
        res.setRole(user.getRole());
        res.setCreatedAt(user.getCreatedAt());

        return res;
    }

    public ResUpdateUserDTO convertToResUpdateUserDTO(User user) {
        ResUpdateUserDTO res = new ResUpdateUserDTO();

        res.setEmail(user.getEmail());
        res.setFirstName(user.getFirstName());
        res.setLastName(user.getLastName());
        res.setDateOfBirth(user.getDateOfBirth());
        res.setGender(user.getGender());
        res.setAddress(user.getAddress());
        res.setCompany(user.getCompany());
        res.setRole(user.getRole());
        res.setUpdatedAt(user.getUpdatedAt());

        return res;
    }

    public ResUserDTO convertToResUserDTO(User user) {
        ResUserDTO res = new ResUserDTO();
        ResUserDTO.CompanyUser com = new ResUserDTO.CompanyUser();
        ResUserDTO.RoleUser role = new ResUserDTO.RoleUser();

        res.setId(user.getId());
        res.setEmail(user.getEmail());
        res.setFirstName(user.getFirstName());
        res.setLastName(user.getLastName());
        res.setDateOfBirth(user.getDateOfBirth());
        res.setUpdatedAt(user.getUpdatedAt());
        res.setCreatedAt(user.getCreatedAt());
        res.setGender(user.getGender());
        res.setAddress(user.getAddress());

        if (user.getCompany() != null) {
            com.setId(user.getCompany().getId());
            com.setName(user.getCompany().getName());
            res.setCompany(com);
        }

        if (user.getRole() != null) {
            role.setId(user.getRole().getId());
            role.setName(user.getRole().getName());
            res.setRoleUser(role);
        }

        return res;
    }

    @Override
    public User handleGetUserByUserName(String email) {
        return this.userRepository.findByEmail(email);
    }

    @Override
    public void updateUserToken(String refreshToken, String email) {
        User currentUser = this.handleGetUserByUserName(email);
        if (currentUser != null) {
            currentUser.setRefreshToken(refreshToken);
        }
        this.userRepository.save(currentUser);
    }

    @Override
    public void updateStatus(User user) {
        var storedUser = this.userRepository.findByEmail(user.getEmail());
        storedUser.setStatus(UserStatusEnum.ONLINE);
        this.userRepository.save(storedUser);
    }

    @Override
    public void disconnect(User user) {
        var storedUser = this.userRepository.findByEmail(user.getEmail());
        if (storedUser != null) {
            storedUser.setStatus(UserStatusEnum.OFFLINE);
            this.userRepository.save(storedUser);
        }
    }

    @Override
    public List<User> findConnectedUsers() {
        return this.userRepository.findAllByStatus(UserStatusEnum.OFFLINE);
    }

}
