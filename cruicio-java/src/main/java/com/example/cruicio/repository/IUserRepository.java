package com.example.cruicio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.cruicio.entity.User;


@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {
    
}
