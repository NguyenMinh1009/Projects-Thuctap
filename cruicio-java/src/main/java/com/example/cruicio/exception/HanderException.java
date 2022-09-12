package com.example.cruicio.exception;

import java.util.Map;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.cruicio.exception.custom.CustomBadRequestException;
import com.example.cruicio.model.CustomError;

@RestControllerAdvice

public class HanderException {
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND) //404
    public Map<String, CustomError> CustomNotFoundException(CustomBadRequestException ex){
        return ex.getErrors();
    }

    @ExceptionHandler(CustomBadRequestException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST) //400
    public Map<String, CustomError> BadRequestException(CustomBadRequestException ex){
        return ex.getErrors();
    }

    // @ExceptionHandler(Exception.class)
    // @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR) //500
    // public Map<String, CustomError> commomException(Exception ex){
    //     Map<String, CustomError> map = new HashMap<>();
    //     map.put("error", CustomError.builder().code("500").message("Something went wrong").build());
    //     return map;
    // }
}
