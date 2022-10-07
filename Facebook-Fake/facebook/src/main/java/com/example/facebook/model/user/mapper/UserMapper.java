package com.example.facebook.model.user.mapper;

import com.example.facebook.entity.User;
import com.example.facebook.model.user.dto.UserDTOCreate;
import com.example.facebook.model.user.dto.UserDTOResponse;

public class UserMapper {
    public static UserDTOResponse toUserDTOResponse(User user) {
        return UserDTOResponse.builder().id(user.getId()).email(user.getEmail()).username(user.getUsername()).build();
    }

    public static User toUser(UserDTOCreate userDTOCreate) {
        return User.builder().username(userDTOCreate.getUsername()).email(userDTOCreate.getEmail())
                .password(userDTOCreate.getPassword()).build();
    }
}
