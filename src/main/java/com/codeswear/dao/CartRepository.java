package com.codeswear.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codeswear.entities.Cart;
import com.codeswear.entities.User;


public interface CartRepository extends JpaRepository<Cart, Long>{
	public Cart findByUser(User user);  
	
}
