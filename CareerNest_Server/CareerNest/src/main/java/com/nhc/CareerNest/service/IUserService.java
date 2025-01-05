package com.nhc.CareerNest.service;

import java.util.List;

import com.nhc.CareerNest.domain.User;

public interface IUserService {
    User handleSaveUser(User user);

    List<User> fetchAllUser();

    void deleteUser(Long id);

    User updateUser(User user);

    boolean isEmailExist(String email);

    User findUserById(Long id);
}
