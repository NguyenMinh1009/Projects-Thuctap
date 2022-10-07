package com.example.facebook.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.facebook.exception.custom.CustomNotFoundException;
import com.example.facebook.model.profile.dto.ProfileDTOResponse;
import com.example.facebook.service.UserService;

import lombok.RequiredArgsConstructor;



@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profiles/{userId}")
public class ProfileController {
    private final UserService userService;

    @GetMapping("")
    public Map<String, Object> getProfile(@PathVariable String userId) throws CustomNotFoundException {
        return userService.getProfile(userId);
    }
    @PostMapping("/follow")
    public Map<String, ProfileDTOResponse> followUser(@PathVariable String userId) throws CustomNotFoundException {
        return userService.followUser(userId);
    }
    @DeleteMapping("/follow")
    public Map<String, ProfileDTOResponse> unfollowUser(@PathVariable String userId) throws CustomNotFoundException {
        return userService.unfollowUser(userId);
    }
}
