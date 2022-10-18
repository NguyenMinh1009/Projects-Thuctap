package com.example.facebook.model.answer.dto;

import java.time.LocalDateTime;

import com.example.facebook.model.comment.dto.AuthorCmtDTOResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerDTOResponse {
    private int answerId;
    private LocalDateTime date;
    private String content;
    private Boolean isCheck;

    
    private AuthorCmtDTOResponse authorCmt;
}
