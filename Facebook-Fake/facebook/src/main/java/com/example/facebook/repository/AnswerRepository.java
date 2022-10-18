package com.example.facebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.facebook.entity.Answer;

@Repository

public interface AnswerRepository extends JpaRepository<Answer, Integer>{
    
}
