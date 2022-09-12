package com.example.cruicio.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
@Builder
public class CustomError {
    private String code;
    private String message;
}

