package com.example.facebook.model.question.mapper;

import java.time.LocalDateTime;

import com.example.facebook.entity.Question;
import com.example.facebook.entity.QuestionCategory;
import com.example.facebook.entity.User;
import com.example.facebook.model.ports.dto.AuthorDTOResponse;
import com.example.facebook.model.question.dto.QuestionDTOCreate;
import com.example.facebook.model.question.dto.QuestionDTOResponse;
import com.example.facebook.model.questionCategory.dto.QCategoryDTOResponse;

public class QuestionMapper {

    public static Question toQuestion(QuestionDTOCreate questionDTOCreate) {
        LocalDateTime timeCurrent = LocalDateTime.now();

        Question question = Question.builder().content(questionDTOCreate.getContent()).date(timeCurrent).build();

        return question;
    }

    public static QuestionDTOResponse toQuestionDTOResponse(Question question, boolean isFollowing) {
        return QuestionDTOResponse.builder().id(question.getId()).content(question.getContent())
                .date(question.getDate()).qCategory(toQCategory(question.getQuestionCategory()))
                .author(toAuthorDTOResponse(question.getUser(), isFollowing)).build();
    }

    private static AuthorDTOResponse toAuthorDTOResponse(User author, boolean isFollowing) {
        return AuthorDTOResponse.builder().id(author.getId()).username(author.getUsername()).following(isFollowing)
                .build();
    }

    private static QCategoryDTOResponse toQCategory(QuestionCategory qCategory) {
        return QCategoryDTOResponse.builder().id(qCategory.getId()).name(qCategory.getName()).build();
    }

}
