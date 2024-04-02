package com.codeswear.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {
	
	private Long cartItemId;
	private String image;
	
	private String productName;
	private Integer quantity;
	private Double price;
	
	public CartItemDTO(Long cartItemId, String image, String productName, Integer quantity, Double price) {
		super();
		this.cartItemId = cartItemId;
		this.image = image;
		this.productName = productName;
		this.quantity = quantity;
		this.price = price;
	}
	
	public Long getCartItemId() {
		return cartItemId;
	}
	public void setCartItemId(Long cartItemId) {
		this.cartItemId = cartItemId;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
}