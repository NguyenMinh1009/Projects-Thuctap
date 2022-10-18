package com.example.facebook.model.answer.dto;

import java.time.LocalDateTime;

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
public class AnswerDTOCreate {
    private LocalDateTime date;
    private String content;
    private Boolean isCheck;
}
