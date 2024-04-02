package com.codeswear.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.codeswear.dao.UserRepository;
import com.codeswear.entities.User;

public class UserDetailsServiceImpl  implements UserDetailsService{
	
	@Autowired
	UserRepository userRepo;

	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user=userRepo.getUsserByName(username);
		if (user==null) {
			throw new UsernameNotFoundException("Could not found");
		}
		
		CustomUserDetails customUserDetails = new CustomUserDetails(user);
		return customUserDetails;
	}

}