package com.nhc.CareerNest.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nhc.CareerNest.domain.dto.response.ResCreateUserDTO;
import com.nhc.CareerNest.domain.dto.response.ResUpdateUserDTO;
import com.nhc.CareerNest.domain.entity.User;
import com.nhc.CareerNest.repository.UserRepository;
import com.nhc.CareerNest.service.IUserService;
import com.nhc.CareerNest.util.constant.UserStatusEnum;

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
