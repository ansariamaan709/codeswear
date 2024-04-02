package com.codeswear.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codeswear.dao.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository; // UserRepository is your Spring Data JPA repository

	/*
	 * public List<Long> getAllUserIds() { return userRepository.findAllIds(); //
	 * Implement findAllIds() in your UserRepository
	 * 
	 * }
	 * 
	 * public List<String> getAllUserEmails() { return
	 * userRepository.findAllEmails(); // Implement findAllIds() in your
	 * UserRepository
	 * 
	 * }
	 * 
	 * public User getUserDataById(Long userId) { return
	 * userRepository.findById(userId); }
	 */
}
