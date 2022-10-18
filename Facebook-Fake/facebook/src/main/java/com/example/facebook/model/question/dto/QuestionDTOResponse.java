package com.example.facebook.model.question.dto;

import java.time.LocalDateTime;

import com.example.facebook.entity.QuestionCategory;
import com.example.facebook.model.ports.dto.AuthorDTOResponse;
import com.example.facebook.model.questionCategory.dto.QCategoryDTOResponse;

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
public class QuestionDTOResponse {
    private int id;
    private String content;
    private LocalDateTime date;

    private AuthorDTOResponse author;

    private QCategoryDTOResponse qCategory;

}
