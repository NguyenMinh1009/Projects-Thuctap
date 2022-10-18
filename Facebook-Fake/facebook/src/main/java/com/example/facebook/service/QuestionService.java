package com.example.facebook.service;

import java.util.Map;

import com.example.facebook.model.question.dto.QuestionDTOCreate;
import com.example.facebook.model.question.dto.QuestionDTOResponse;

public interface QuestionService {

    Map<String, QuestionDTOResponse> createQuestion(Map<String, QuestionDTOCreate> questionDTOCreateMap, Integer qCategoryId);

    Map<String, Object> getListQuestion();
    
}
