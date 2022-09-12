package com.example.cruicio.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.cruicio.entity.User;
import com.example.cruicio.exception.custom.CustomNotFoundException;
import com.example.cruicio.repository.IUserRepository;
import com.example.cruicio.service.IUserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService{


    private final IUserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(int id){
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.get();
    }

    @Override
    public void updateUser(User user) {
        user.setId(user.getId());
        userRepository.save(user);
    }

    @Override
    public void deleteUserById(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public User createUser(User user)  {
        userRepository.save(user);
        return user;
    }
    
}
