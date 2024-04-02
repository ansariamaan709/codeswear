package com.codeswear.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codeswear.dao.UserRepository;
import com.codeswear.jwt.JwtRequest;
import com.codeswear.jwt.JwtResponse;
import com.codeswear.jwt.JwtUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class JwtUserController {
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtUtil;

	@PostMapping("/authenticate")
	@Operation(summary = "Authenticate user and get JWT Token")
	public JwtResponse authenticate(@RequestBody JwtRequest jwtRequest) throws Exception {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(jwtRequest.getUserName(), jwtRequest.getPassword()));
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
		final UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getUserName());

		final String token = jwtUtil.generateToken(userDetails);
		return new JwtResponse(token);
	}

	@PostMapping("/login")
	@CrossOrigin(origins = "http://localhost:4200")
	@Operation(summary = "Login based on user role after authentication", security = @SecurityRequirement(name = "bearerAuth"))
	public String logInUser(@RequestParam String username) {
		if (username.equals("amaan898351@gmail.com")) {
		return "ADMIN";
		}
		else {
			return "USER";
		}
	}
}
