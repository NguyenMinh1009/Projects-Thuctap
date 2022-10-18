package com.example.facebook.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.facebook.model.answer.dto.AnswerDTOCreate;
import com.example.facebook.model.answer.dto.AnswerDTOResponse;
import com.example.facebook.service.AnswerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/question")
@CrossOrigin(origins = "http://localhost:8081/")
public class AnswerController {
    private final AnswerService answerService;

    @PostMapping("/{questionId}/answer")
    public Map<String, AnswerDTOResponse> createAnswer(@RequestBody Map<String, AnswerDTOCreate> answerDTOCreateMap,
            @PathVariable Integer questionId) {
        return answerService.createAnswer(answerDTOCreateMap, questionId);
    }

    @GetMapping("/{questionId}/answer")
    public Map<String, Object> getListAnswer(@PathVariable Integer questionId) {
        return answerService.getListAnswer(questionId);
    }

}
