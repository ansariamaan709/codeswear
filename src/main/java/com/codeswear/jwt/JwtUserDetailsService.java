package com.codeswear.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import com.codeswear.dao.UserRepository;
import com.codeswear.entities.User;



@Service
public class JwtUserDetailsService implements UserDetailsService {

    // Implement loadUserByUsername method
	@Autowired
	UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	User user = userRepo.findByEmail(username);
    	return user;
       
    }
}

