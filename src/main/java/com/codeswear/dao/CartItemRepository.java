package com.codeswear.dao;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.codeswear.entities.CartItem;
import com.codeswear.entities.Product;


public interface CartItemRepository extends CrudRepository<CartItem, Long> {
		public CartItem findByProduct(Product product);
		
		@Transactional
	    @Modifying
	    @Query("delete from CartItem c where c.cartItemId = :cartItemId")
	    void deleteByCartItemIdQuery(@Param("cartItemId") Long cartItemId);
		
		
		public boolean existsByProductProductId(Long productId);
}
