package com.codeswear.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codeswear.entities.Product;

public interface ProductRepository  extends JpaRepository<Product, Long> {

	public Product findByProductId(Long productId);
	
	public List<Product> findAll();
	
	List<Product> findByCategoryCategoryType(Long categoryType);
	
	
}
