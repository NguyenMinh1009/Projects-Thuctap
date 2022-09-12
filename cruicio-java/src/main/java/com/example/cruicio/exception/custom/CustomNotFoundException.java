package com.example.cruicio.exception.custom;

import com.example.cruicio.model.CustomError;

public class CustomNotFoundException extends BaseException {
    public CustomNotFoundException(CustomError customError) {
        super(customError);
    }
}
