package com.example.facebook.exception.custom;

import com.example.facebook.model.CustomError;

public class CustomNotFoundException extends BaseCustomException {

    public CustomNotFoundException(CustomError customError) {
        super(customError);
    }

}
