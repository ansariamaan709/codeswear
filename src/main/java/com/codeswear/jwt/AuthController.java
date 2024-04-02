package com.codeswear.jwt;

//AuthController.java
import org.springframework.http.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class AuthController {

	private final AuthService authService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	BCryptPasswordEncoder passwordEncoder;

	@Autowired
	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	/*
	 * @PostMapping("/api/login") public String login(@RequestBody LoginRequest
	 * loginRequest) { String username = loginRequest.getUserName(); String password
	 * = loginRequest.getPassword(); return authService.authenticate(username,
	 * password); }
	 */

	@PostMapping("/auth")
		public String authenticateUser(@RequestBody LoginRequest authenticationRequest,RedirectAttributes redirectAttributes,HttpServletResponse res) {
     try {
    	 Authentication authentication = authenticationManager.authenticate(
                 new UsernamePasswordAuthenticationToken(authenticationRequest.getUserName(), authenticationRequest.getPassword())
         );

         SecurityContextHolder.getContext().setAuthentication(authentication);

         UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUserName());
         JwtUtil jwtUtil = new JwtUtil();
         String jwt = jwtUtil.generateToken(userDetails);

         Cookie cookie = new Cookie("token",jwt);
     	cookie.setMaxAge(Integer.MAX_VALUE);
     	res.addCookie(cookie);
     	
         return "redirect:/user/index";

     }
/*         // Authenticate the user and generate a JWT token
        // String jwtToken = authService.authenticate(authenticationRequest.getUserName(), authenticationRequest.getPassword(),Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
         HttpHeaders headers = new HttpHeaders();
         headers.set("Authorization", "Bearer " + jwtToken);
         ResponseEntity<String> userIndexResponse=callUserIndexApi(jwtToken, headers);
         if (userIndexResponse.getStatusCode().is2xxSuccessful()) {
             // Return Thymeleaf view "user/user_dashboard"
             return "redirect:user/user_dashboard";
         } else {
             // Handle other status codes if needed
             return "redirect:/login"; // Redirect to login page for simplicity
         }*/
     catch (Exception e) {
         return "redirect:/login"; // Redirect to login page on error
     }
     
	}

	private ResponseEntity<String> callUserIndexApi(String jwtToken, HttpHeaders headers) {
		// Create a RestTemplate instance
		RestTemplate restTemplate = new RestTemplate();

		// Add the headers with the JWT token
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + jwtToken);

		// Create a request entity with the headers
		HttpEntity<String> requestEntity = new HttpEntity<>(headers);

		// Make the request to /user/index
		try {
			ResponseEntity<String> apiResponse = restTemplate.exchange("http://localhost:8080/user/index",
					HttpMethod.POST, requestEntity, String.class);
			return apiResponse;
		} catch (HttpClientErrorException e) {
			// Handle client errors (4xx) here, if needed
			return new ResponseEntity<>(e.getStatusCode());
		}
	}

}
