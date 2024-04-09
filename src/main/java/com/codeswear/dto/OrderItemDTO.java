package com.codeswear.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {

	private Long orderItemId;
	
	private Integer quantity;
	private double discount;
	private double orderedProductPrice;
	
	private String image;
	
	private String productName;
	
	public OrderItemDTO(Long orderItemId, Integer quantity, double discount, double orderedProductPrice,
			 String image, String productName) {
		super();
		this.orderItemId = orderItemId;
		this.quantity = quantity;
		this.discount = discount;
		this.orderedProductPrice = orderedProductPrice;
		
		this.image = image;
		this.productName = productName;
		
	}

	private Double price;

	public Long getOrderItemId() {
		return orderItemId;
	}

	public void setOrderItemId(Long orderItemId) {
		this.orderItemId = orderItemId;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	public double getOrderedProductPrice() {
		return orderedProductPrice;
	}

	public void setOrderedProductPrice(double orderedProductPrice) {
		this.orderedProductPrice = orderedProductPrice;
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

	
	
}
