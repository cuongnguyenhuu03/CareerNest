package com.nhc.CareerNest.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.domain.dto.request.ReqLoginDTO;
import com.nhc.CareerNest.domain.dto.response.ResLoginDTO;
import com.nhc.CareerNest.domain.dto.response.RestResponse;
import com.nhc.CareerNest.domain.entity.User;
import com.nhc.CareerNest.service.impl.UserService;
import com.nhc.CareerNest.util.exception.IdInvalidException;
import com.nhc.CareerNest.util.security.SecurityUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class AuthController {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final SecurityUtil securityUtil;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Value("${careernest.jwt.refresh-token-validity-in-seconds}")
    private int refreshTokenExpiration;

    public AuthController(
            PasswordEncoder passwordEncoder,
            AuthenticationManagerBuilder authenticationManagerBuilder,
            SecurityUtil securityUtil,
            UserService userService) {
        this.passwordEncoder = passwordEncoder;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.securityUtil = securityUtil;
        this.userService = userService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<RestResponse> login(
            @RequestBody ReqLoginDTO loginDto,
            HttpServletResponse response) {

        // nạp input gồm username/ password vào security
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDto.getUsername(), loginDto.getPassword());

        // xác thực người dùng => cần viết hàm loaduserByUserName
        Authentication authentication = this.authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        ResLoginDTO resLoginDTO = new ResLoginDTO();

        User currentUserDb = this.userService.handleGetUserByUserName(loginDto.getUsername());
        if (currentUserDb != null) {
            ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin(
                    currentUserDb.getId(),
                    currentUserDb.getEmail(),
                    currentUserDb.getFirstName(),
                    currentUserDb.getLastName());
            // currentUserDb.getRole());

            resLoginDTO.setUser(userLogin);
        }

        // create a token
        String access_token = this.securityUtil.createAccessToken(authentication.getName(), resLoginDTO);
        resLoginDTO.setAccessToken(access_token);

        // create refresh token
        String refresh_token = this.securityUtil.createRefreshToken(loginDto.getUsername(), resLoginDTO);

        // update user
        this.userService.updateUserToken(refresh_token, loginDto.getUsername());

        // set cookies
        Cookie cookie = new Cookie("refresh_token", refresh_token);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(refreshTokenExpiration);

        // add cookie to response
        response.addCookie(cookie);

        RestResponse res = new RestResponse();
        res.setData(resLoginDTO);
        res.setMessage("login success");
        res.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.ok(res);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<RestResponse> register(@Valid @RequestBody User RegisterUser) throws IdInvalidException {
        boolean isEmailExist = this.userService.isEmailExist(RegisterUser.getEmail());
        if (isEmailExist) {
            throw new IdInvalidException(
                    "Email " + RegisterUser.getEmail() + " already exists.");
        }

        String hashPassword = this.passwordEncoder.encode(RegisterUser.getPassword());
        RegisterUser.setPassword(hashPassword);
        User newUser = this.userService.handleSaveUser(RegisterUser);

        RestResponse res = new RestResponse();
        res.setData(this.userService.convertToResUpdateUserDTO(newUser));
        res.setMessage("update user success");
        res.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.ok(res);
    }

}
