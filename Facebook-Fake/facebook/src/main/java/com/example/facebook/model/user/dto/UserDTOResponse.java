package com.example.facebook.model.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTOResponse {
    private int id;
    private String email;
    private String username;
    private String token;
}
