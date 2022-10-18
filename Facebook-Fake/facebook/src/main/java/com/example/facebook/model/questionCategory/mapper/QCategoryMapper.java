package com.example.facebook.model.questionCategory.mapper;

import com.example.facebook.entity.QuestionCategory;
import com.example.facebook.model.questionCategory.dto.QCategoryDTOResponse;

public class QCategoryMapper {
    private static QCategoryDTOResponse toQCategory(QuestionCategory qCategory){
        return QCategoryDTOResponse.builder().id(qCategory.getId()).name(qCategory.getName()).build();
    }
}
