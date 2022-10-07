package com.example.facebook.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.facebook.entity.Posts;

public interface PostsRepository extends JpaRepository<Posts, Integer>{
    
}
