package com.example.facebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.facebook.entity.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer>{
    
}
