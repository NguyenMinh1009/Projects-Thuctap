package com.example.facebook.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.facebook.entity.Answer;
import com.example.facebook.entity.Question;
import com.example.facebook.entity.User;
import com.example.facebook.model.answer.dto.AnswerDTOCreate;
import com.example.facebook.model.answer.dto.AnswerDTOResponse;
import com.example.facebook.model.answer.mapper.AnswerMapper;
import com.example.facebook.repository.AnswerRepository;
import com.example.facebook.repository.QuestionRepository;
import com.example.facebook.repository.Custom.AnswerCriteria;
import com.example.facebook.service.AnswerService;
import com.example.facebook.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AnswerServiceImpl implements AnswerService {
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final UserService userService;
    private final AnswerCriteria answerCriteria;

    @Override
    public Map<String, AnswerDTOResponse> createAnswer(Map<String, AnswerDTOCreate> answerDTOCreateMap,
            Integer questionId) {

        AnswerDTOCreate answerDTOCreate = answerDTOCreateMap.get("answer");
        // System.out.println("content:  "+ answerDTOCreate.getContent());
        // System.out.println("answer:  "+ answerDTOCreate.);

        Answer answer = AnswerMapper.toAnswer(answerDTOCreate);
        User currentUser = userService.getUserLoggedIn();
        Question question = questionRepository.findById(questionId).get();

        answer.setUser(currentUser);
        answer.setQuestion(question);

        answer = answerRepository.save(answer);
        Map<String, AnswerDTOResponse> wrapper = new HashMap<>();
        AnswerDTOResponse answerDTOResponse = AnswerMapper.toAnswerDTOResponse(answer, false);
        wrapper.put("answer", answerDTOResponse);
        return wrapper;
    }


    @Override
    public Map<String, Object> getListAnswer(Integer questionId) {
        Map<String, Object> results = answerCriteria.findAll(questionId);
        
        List<Answer> answers = (List<Answer>) results.get("listAnswer");
        boolean isFollowing = false;
        List<AnswerDTOResponse> listAnswerDTOResponses = new ArrayList<>();
        
        try {
            User currentUser = userService.getUserLoggedIn();
            for (Answer a : answers) {
                isFollowing = false;

                User author = a.getUser();
                Set<User> followers = author.getFollowers();
                for (User u : followers) {
                    if (u.getId() == currentUser.getId()) {
                        isFollowing = true;
                        break;
                    }
                }
                if (currentUser.getId() == a.getUser().getId()) {
                    isFollowing = true;
                }
                listAnswerDTOResponses.add(AnswerMapper.toAnswerDTOResponse(a, isFollowing));
            }
            // -------------------------------------------------------------
        } catch (Exception e) {
            for (Answer a: answers) {
                listAnswerDTOResponses.add(AnswerMapper.toAnswerDTOResponse(a, isFollowing));
            }
        }
        Map<String, Object> wrapper = new HashMap<>();
        wrapper.put("answers", listAnswerDTOResponses);
        wrapper.put("questionId", questionId);
        return wrapper;
    }




}
