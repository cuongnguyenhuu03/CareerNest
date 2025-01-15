package com.nhc.CareerNest.controller;

import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.domain.dto.response.RestResponse;
import com.nhc.CareerNest.domain.entity.User;
import com.nhc.CareerNest.service.impl.UserService;
import com.nhc.CareerNest.util.anotation.ApiMessage;
import com.nhc.CareerNest.util.exception.IdInvalidException;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(
            PasswordEncoder passwordEncoder,
            UserService userService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/users")
    @ApiMessage("Create a new user")
    public ResponseEntity<RestResponse> createUser(@RequestBody User user) throws IdInvalidException {
        boolean isEmailExist = this.userService.isEmailExist(user.getEmail());
        if (isEmailExist) {
            throw new IdInvalidException("Email Already Exists");
        }

        String hashPassword = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(hashPassword);

        User createdUser = this.userService.handleSaveUser(user);

        RestResponse res = new RestResponse();
        res.setData(this.userService.convertToResCreateUserDTO(createdUser));
        res.setMessage("Save user success");
        res.setStatusCode(HttpStatus.CREATED.value());

        return ResponseEntity.ok(res);
    }

    @GetMapping("/users")
    @ApiMessage("Fetch all users")
    public ResponseEntity<RestResponse> fetchAllUser() {
        List<User> users = this.userService.fetchAllUser();

        RestResponse res = new RestResponse();
        res.setData(users);
        res.setMessage("fetch all user success");
        res.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.ok(res);
    }

    @PutMapping("/users")
    @ApiMessage("Update a user")
    public ResponseEntity<RestResponse> updateUser(@RequestBody User user) throws IdInvalidException {

        User updateUser = this.userService.findUserById(user.getId());
        if (updateUser == null) {
            throw new IdInvalidException("Can not find user with id: " + user.getId());
        }

        updateUser.setFirstName(user.getFirstName());
        updateUser.setLastName(user.getLastName());
        updateUser.setAddress(user.getAddress());
        updateUser.setDateOfBirth(user.getDateOfBirth());
        updateUser.setGender(user.getGender());
        updateUser.setPhoneNumber(user.getPhoneNumber());

        updateUser = this.userService.handleSaveUser(updateUser);

        RestResponse res = new RestResponse();
        res.setData(this.userService.convertToResUpdateUserDTO(updateUser));
        res.setMessage("update user success");
        res.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.ok(res);
    }

    @DeleteMapping("users/{id}")
    @ApiMessage("Delete a user")
    public ResponseEntity<RestResponse> deleteUser(@PathVariable("id") Long id) throws IdInvalidException {

        User deleteUser = this.userService.findUserById(id);
        if (deleteUser == null) {
            throw new IdInvalidException("Can not find user with id: " + id);
        }

        deleteUser.setBlocked(true);
        this.userService.handleSaveUser(deleteUser);

        RestResponse res = new RestResponse();
        res.setMessage("delete user success");
        res.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.ok(res);
    }
}
