package com.example.facebook.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TokenPayload {
    private int userId;
    private String email;
}
