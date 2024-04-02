package com.codeswear.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.codeswear.dao.UserRepository;
import com.codeswear.entities.Role;
import com.codeswear.entities.User;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

	@Autowired
	UserRepository userRepo;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@PostMapping("api/user/signup")
	public ResponseEntity<?> signUp(@RequestBody User user) {

		// Example error condition: invalid email format
		if (!isValidEmail(user.getEmail())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email format");
		}
		// Example error condition: password too short
		if (user.getPassword().length() < 6) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password must be at least 6 characters long");
		}
		Set<Role> roles = new HashSet<>();
		for (Role role : roles) {
			role.setRoleId((long) 1);
			role.setRoleName("Admin");
			roles.add(role);

		}
		user.setRoles(roles);
		user.setFirstName(user.getFirstName());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setEmail(user.getEmail());
		this.userRepo.save(user);
		System.out.println("User is saved");
		return ResponseEntity.status(HttpStatus.CREATED).body("User is created");

	}

	@PostMapping("api/user/login")
	public ResponseEntity<?> login(@RequestBody User user) {
		User userLogin = userRepo.getUsserByName(user.getEmail());
		String userPassword = passwordEncoder.encode(user.getPassword());
		if (userLogin != null && passwordEncoder.matches(user.getPassword(), userLogin.getPassword())) {
			return ResponseEntity.status(HttpStatus.CREATED).body("User is Logged In");
		} else if (userLogin == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User is not avalable");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username or password is Incorrect");
	}

	private boolean isValidEmail(String email) {
		// TODO Auto-generated method stub
		if (userRepo.findAllEmails().contains(email)) {
			return false;
		}
		return true;
	}
}
