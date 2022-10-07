package com.example.facebook.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.facebook.exception.custom.CustomBadRequestException;
import com.example.facebook.exception.custom.CustomNotFoundException;
import com.example.facebook.model.user.dto.UserDTOCreate;
import com.example.facebook.model.user.dto.UserDTOLoginRequest;
import com.example.facebook.model.user.dto.UserDTOResponse;
import com.example.facebook.service.UserService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;

    @PostMapping("/users/login")
    public Map<String, UserDTOResponse> login(@RequestBody Map<String, UserDTOLoginRequest> userLoginRequestMap) throws CustomBadRequestException{
        return userService.authenticate(userLoginRequestMap);
    }

    @PostMapping("/users")
    public Map<String, UserDTOResponse> registerUser(
            @RequestBody Map<String, UserDTOCreate> userDTOCreateMap) {
        return userService.registerUser(userDTOCreateMap);
    }

    @GetMapping("/user")
    public Map<String, UserDTOResponse> getCurrentUser() throws CustomNotFoundException {
        return userService.getCurrentUser();
    }
}
