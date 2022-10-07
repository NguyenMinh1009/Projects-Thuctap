package com.example.facebook.service;

import java.util.Map;

import com.example.facebook.entity.User;
import com.example.facebook.exception.custom.CustomBadRequestException;
import com.example.facebook.exception.custom.CustomNotFoundException;
import com.example.facebook.model.profile.dto.ProfileDTOResponse;
import com.example.facebook.model.user.dto.UserDTOCreate;
import com.example.facebook.model.user.dto.UserDTOLoginRequest;
import com.example.facebook.model.user.dto.UserDTOResponse;

public interface UserService {

    public Map<String, UserDTOResponse> authenticate(Map<String, UserDTOLoginRequest> userLoginRequestMap)
            throws CustomBadRequestException;

    public Map<String, UserDTOResponse> registerUser(Map<String, UserDTOCreate> userDTOCreateMap);

    public Map<String, UserDTOResponse> getCurrentUser() throws CustomNotFoundException;

    public User getUserLoggedIn();

    public Map<String, Object> getProfile(String userId) throws CustomNotFoundException ;

    public Map<String, ProfileDTOResponse> followUser(String userId) throws CustomNotFoundException ;

    public Map<String, ProfileDTOResponse> unfollowUser(String userId) throws CustomNotFoundException ;


}
