package com.example.facebook.service;

import java.util.Map;

import com.example.facebook.model.answer.dto.AnswerDTOCreate;
import com.example.facebook.model.answer.dto.AnswerDTOResponse;

public interface AnswerService {

    Map<String, AnswerDTOResponse> createAnswer(Map<String, AnswerDTOCreate> answerDTOCreateMap, Integer questionId);

    Map<String, Object> getListAnswer(Integer questionId);
    
}
