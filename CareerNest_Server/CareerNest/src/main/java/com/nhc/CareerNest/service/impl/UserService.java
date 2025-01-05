package com.nhc.CareerNest.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nhc.CareerNest.domain.User;
import com.nhc.CareerNest.domain.response.ResCreateUserDTO;
import com.nhc.CareerNest.domain.response.ResUpdateUserDTO;
import com.nhc.CareerNest.repository.UserRepository;
import com.nhc.CareerNest.service.IUserService;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;

    public UserService(
            UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User handleSaveUser(User user) {
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
        return null;

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

        return res;
    }

}
