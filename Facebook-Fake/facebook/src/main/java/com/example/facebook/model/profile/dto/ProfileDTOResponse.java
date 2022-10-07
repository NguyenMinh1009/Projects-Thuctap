package com.example.facebook.model.profile.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileDTOResponse {
    private String username;
    private boolean following;
    // private int followedNumber;
    // private int followingNumber;
}
