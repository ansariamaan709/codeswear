package com.codeswear.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codeswear.entities.PurchaseOrder;
import com.codeswear.entities.User;

public interface OrderRepository extends JpaRepository<PurchaseOrder, Long>{
	public PurchaseOrder findByUser(User user);  
	
}
