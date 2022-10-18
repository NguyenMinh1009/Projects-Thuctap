package com.example.facebook.model.answer.mapper;

import java.time.LocalDateTime;

import com.example.facebook.entity.Answer;
import com.example.facebook.entity.User;
import com.example.facebook.model.answer.dto.AnswerDTOCreate;
import com.example.facebook.model.answer.dto.AnswerDTOResponse;
import com.example.facebook.model.comment.dto.AuthorCmtDTOResponse;

public class AnswerMapper {

    public static Answer toAnswer(AnswerDTOCreate answerDTOCreate) {
        LocalDateTime timeCurrent = LocalDateTime.now();
        Answer answer = Answer.builder().content(answerDTOCreate.getContent()).date(timeCurrent).isCheck(answerDTOCreate.getIsCheck()).build();
        return answer;
    }

    public static AnswerDTOResponse toAnswerDTOResponse(Answer answer, boolean isFollowing) {
        return AnswerDTOResponse.builder().answerId(answer.getId()).date(answer.getDate()).content(answer.getContent()).isCheck(answer.getIsCheck())
        .authorCmt(toAuthorCmtDTOResponse(answer.getUser(), isFollowing)).build();
    }
    
    private static AuthorCmtDTOResponse toAuthorCmtDTOResponse(User author, boolean isFollowing) {
        return AuthorCmtDTOResponse.builder().id(author.getId()).username(author.getUsername()).following(isFollowing).build();
    }
}
