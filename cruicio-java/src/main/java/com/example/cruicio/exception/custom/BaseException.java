package com.example.cruicio.exception.custom;

import java.util.HashMap;
import java.util.Map;

import com.example.cruicio.model.CustomError;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class BaseException extends Exception{
    Map<String, CustomError> errors;

    public BaseException(CustomError customError) {
        this.errors = new HashMap<String, CustomError>();
        this.errors.put("errors", customError);
    } 
}
