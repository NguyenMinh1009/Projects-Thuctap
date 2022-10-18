package com.example.facebook.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.facebook.model.question.dto.QuestionDTOCreate;
import com.example.facebook.model.question.dto.QuestionDTOResponse;
import com.example.facebook.service.QuestionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8081/")
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping("/api/question/{qCategoryId}")
    public Map<String, QuestionDTOResponse> createQuestion(@RequestBody Map<String, QuestionDTOCreate> questionDTOCreateMap, 
    @PathVariable Integer qCategoryId) {
        return questionService.createQuestion(questionDTOCreateMap, qCategoryId);
    }

    @GetMapping("/api/question")
    public Map<String, Object> getListQuestion() {
        return questionService.getListQuestion();
    }
}
