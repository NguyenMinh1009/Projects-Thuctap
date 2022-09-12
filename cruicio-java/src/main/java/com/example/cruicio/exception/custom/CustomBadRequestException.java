package com.example.cruicio.exception.custom;

import com.example.cruicio.model.CustomError;

public class CustomBadRequestException extends BaseException{
    public CustomBadRequestException(CustomError customError){
        super(customError);
    }
}
