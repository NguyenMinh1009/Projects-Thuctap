package com.example.facebook.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.facebook.entity.Question;
import com.example.facebook.entity.QuestionCategory;
import com.example.facebook.entity.User;
import com.example.facebook.model.question.dto.QuestionDTOCreate;
import com.example.facebook.model.question.dto.QuestionDTOResponse;
import com.example.facebook.model.question.mapper.QuestionMapper;
import com.example.facebook.repository.QuestionCategoryRepository;
import com.example.facebook.repository.QuestionRepository;
import com.example.facebook.repository.Custom.QuestionCriteria;
import com.example.facebook.service.QuestionService;
import com.example.facebook.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class QuestionServiceImpl implements QuestionService{

    private final QuestionRepository questionRepository;
    private final QuestionCategoryRepository questionCategoryRepository;
    private final UserService userService;
    private final QuestionCriteria questionCriteria;


    @Override
    public Map<String, QuestionDTOResponse> createQuestion(Map<String, QuestionDTOCreate> questionDTOCreateMap, Integer qCategoryId) {
        QuestionDTOCreate questionDTOCreate = questionDTOCreateMap.get("question");

        Question question = QuestionMapper.toQuestion(questionDTOCreate);

        QuestionCategory qCategory = questionCategoryRepository.findById(qCategoryId).get();
        User currentUser = userService.getUserLoggedIn();
        question.setUser(currentUser);
        question.setQuestionCategory(qCategory);
        question = questionRepository.save(question);

        Map<String, QuestionDTOResponse> wrapper = new HashMap<>();
        QuestionDTOResponse questionDTOResponse = QuestionMapper.toQuestionDTOResponse(question, false);
        wrapper.put("question", questionDTOResponse);
        return wrapper;
    }

    @Override
    public Map<String, Object> getListQuestion() {
        Map<String, Object> results = questionCriteria.findAll();
        int countPosts = 0;

        List<Question> questions = (List<Question>) results.get("listQuestion");
        boolean isFollowing = false;
        List<QuestionDTOResponse> listQuestionDTOResponses = new ArrayList<>();

        try {
            User currentUser = userService.getUserLoggedIn();
            for (Question q : questions) {
                isFollowing = false;

                User author = q.getUser();
                Set<User> followers = author.getFollowers();
                for (User u : followers) {
                    if (u.getId() == currentUser.getId()) {
                        isFollowing = true;
                        break;
                    }
                }
                if (currentUser.getId() == q.getUser().getId()) {
                    isFollowing = true;
                }
                listQuestionDTOResponses.add(QuestionMapper.toQuestionDTOResponse(q, isFollowing));
            }
            // -------------------------------------------------------------
        } catch (Exception e) {
            for (Question q: questions) {
                listQuestionDTOResponses.add(QuestionMapper.toQuestionDTOResponse(q, isFollowing));
            }
        }
        Map<String, Object> wrapper = new HashMap<>();
        wrapper.put("questions", listQuestionDTOResponses);
        return wrapper;
    }


    
}
