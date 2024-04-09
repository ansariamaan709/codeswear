package com.codeswear.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

	private List<OrderItemDTO> content;
	private String userName;
	public OrderResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public List<OrderItemDTO> getContent() {
		return content;
	}
	public void setContent(List<OrderItemDTO> content) {
		this.content = content;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
}
