package com.example.facebook.service.impl;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.facebook.entity.User;
import com.example.facebook.exception.custom.CustomBadRequestException;
import com.example.facebook.exception.custom.CustomNotFoundException;
import com.example.facebook.model.CustomError;
import com.example.facebook.model.profile.dto.ProfileDTOResponse;
import com.example.facebook.model.user.dto.UserDTOCreate;
import com.example.facebook.model.user.dto.UserDTOLoginRequest;
import com.example.facebook.model.user.dto.UserDTOResponse;
import com.example.facebook.model.user.mapper.UserMapper;
import com.example.facebook.repository.UserRepository;
import com.example.facebook.service.UserService;
import com.example.facebook.util.JwtTokenUtil;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Map<String, UserDTOResponse> authenticate(Map<String, UserDTOLoginRequest> userLoginRequestMap)
            throws CustomBadRequestException {
        UserDTOLoginRequest userDTOLoginRequest = userLoginRequestMap.get("user");

        Optional<User> userOptional = userRepository.findByEmail(userDTOLoginRequest.getEmail());

        boolean isAuthen = false;
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (passwordEncoder.matches(userDTOLoginRequest.getPassword(), user.getPassword())) {
                isAuthen = true;
            }
        }
        if (!isAuthen) {
            throw new CustomBadRequestException(
                    CustomError.builder().code("400").message("Username or password incorrect").build());
            // System.out.println("tai khoan, mat khau sai");
        }
        return buildDTOResponse(userOptional.get());
    }

    @Override
    public Map<String, UserDTOResponse> registerUser(Map<String, UserDTOCreate> userDTOCreateMap) {
        UserDTOCreate userDTOCreate = userDTOCreateMap.get("user");
        User user = UserMapper.toUser(userDTOCreate);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = userRepository.save(user);
        return buildDTOResponse(user);
    }

    private Map<String, UserDTOResponse> buildDTOResponse(User user) {
        Map<String, UserDTOResponse> wrapper = new HashMap<>();
        UserDTOResponse userDTOResponse = UserMapper.toUserDTOResponse(user);
        userDTOResponse.setToken(jwtTokenUtil.generateToken(user, 24 * 60 * 60));
        wrapper.put("user", userDTOResponse);
        return wrapper;
    }

    @Override
    public Map<String, UserDTOResponse> getCurrentUser() throws CustomNotFoundException {
        User userLoggedIn = getUserLoggedIn();
        if (userLoggedIn != null) {
            return buildDTOResponse(userLoggedIn);
        }
        throw new CustomNotFoundException(CustomError.builder().code("404").message("User not exist").build());
    }

    @Override
    public User getUserLoggedIn() {
        Object princial = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (princial instanceof UserDetails) {
            String email = ((UserDetails) princial).getUsername();
            User user = userRepository.findByEmail(email).get();
            return user;
        }
        return null;
    }

    @Override
    public Map<String, Object> getProfile(String userId) throws CustomNotFoundException {
        User userLoggedIn = getUserLoggedIn();
        Optional<User> userOptional = userRepository.findById(Integer.parseInt(userId));
        if (userOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("User Not Found").build());
        }
        User user = userOptional.get();
        Set<User> followers = user.getFollowers();
        Set<User> followering = user.getFollowing();
        boolean isFollowing = false;
        for (User u : followers) {
            if (u.getId() == userLoggedIn.getId()) {
                isFollowing = true;
                break;
            }
        }
        int followedNumber = followers.size();
        int followingNumber = followering.size();

        //  --------------------------------------------------------
        Map<String, Object> wrapper = new HashMap<>();
        ProfileDTOResponse profileDTOResponse = ProfileDTOResponse.builder()
                .username(user.getUsername())
                .following(isFollowing)
                .build();

        wrapper.put("profile", profileDTOResponse);
        wrapper.put("followedNumber", followedNumber);
        wrapper.put("followingNumber", followingNumber);
        return wrapper;
    }

    private Map<String, ProfileDTOResponse> buildProfileResponse(User user, boolean isFollowing) {
        Map<String, ProfileDTOResponse> wrapper = new HashMap<>();
        ProfileDTOResponse profileDTOResponse = ProfileDTOResponse.builder()
                .username(user.getUsername())
                .following(isFollowing)
                .build();

        wrapper.put("profile", profileDTOResponse);
        return wrapper;
    }

    @Override
    public Map<String, ProfileDTOResponse> followUser(String userId) throws CustomNotFoundException {
        User userLoggedIn = getUserLoggedIn();
        Optional<User> userOptional = userRepository.findById(Integer.parseInt(userId));
        if (userOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("User Not Found").build());
        }
        User user = userOptional.get();
        Set<User> followers = user.getFollowers();
        boolean isFollowing = false;
        for (User u : followers) {
            if (u.getId() == userLoggedIn.getId()) {
                isFollowing = true;
                break;
            }
        }

        if (!isFollowing) {
            isFollowing = true;
            user.getFollowers().add(userLoggedIn);
            user = userRepository.save(user);
        }
        return buildProfileResponse(userOptional.get(), isFollowing);
    }

    @Override
    public Map<String, ProfileDTOResponse> unfollowUser(String userId) throws CustomNotFoundException {
        User userLoggedIn = getUserLoggedIn();
        Optional<User> userOptional = userRepository.findById(Integer.parseInt(userId));

        if (userOptional.isEmpty()) {
            throw new CustomNotFoundException(CustomError.builder().code("404").message("User Not Found").build());
        }
        User user = userOptional.get();
        Set<User> followers = user.getFollowers();
        boolean isFollowing = false;
        for (User u : followers) {
            if (u.getId() == userLoggedIn.getId()) {
                isFollowing = true;
                break;
            }
        }

        if (isFollowing) {
            isFollowing = true;
            user.getFollowers().remove(userLoggedIn);
            user = userRepository.save(user);
            isFollowing = false;

        }
        return buildProfileResponse(userOptional.get(), isFollowing);
    }


}
