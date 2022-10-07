package com.example.facebook.exception.custom;

import com.example.facebook.model.CustomError;

public class CustomTokenException extends BaseCustomException {

    public CustomTokenException(CustomError customError) {
        super(customError);
    }
    
}
