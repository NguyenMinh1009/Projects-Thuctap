package com.example.facebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.facebook.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer>{
    
}
