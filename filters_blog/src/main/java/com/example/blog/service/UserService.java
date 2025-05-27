package com.example.blog.service;

import com.example.blog.model.User;
import com.example.blog.repository.UserRepository;
import com.example.blog.util.PasswordUtil;

import java.util.List;
import java.util.Optional;

public class UserService {
    
    private final UserRepository userRepository;
    
    public UserService() {
        this.userRepository = new UserRepository();
    }
    
    public User createUser(User user) {
        // Hash the password before saving
        user.setPassword(PasswordUtil.hashPassword(user.getPassword()));
        return userRepository.save(user);
    }
    
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User updateUser(User user) {
        return userRepository.save(user);
    }
    
    public void deleteUser(Long id) {
        userRepository.delete(id);
    }
    
    public boolean authenticate(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return PasswordUtil.checkPassword(password, user.getPassword());
        }
        return false;
    }
}
