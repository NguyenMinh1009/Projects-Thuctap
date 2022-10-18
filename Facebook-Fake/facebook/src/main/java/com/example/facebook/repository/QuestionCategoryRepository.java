package com.example.facebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.facebook.entity.QuestionCategory;

@Repository
public interface QuestionCategoryRepository extends JpaRepository<QuestionCategory, Integer>{
    
}
