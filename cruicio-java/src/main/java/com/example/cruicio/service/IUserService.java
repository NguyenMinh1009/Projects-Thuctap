package com.example.cruicio.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.cruicio.entity.User;

@Service
public interface IUserService {

    List<User> getAllUsers();

    User getUserById(int id) ;

    void updateUser(User user);

    void deleteUserById(int id) ;

    User createUser(User user) ;
    
}
