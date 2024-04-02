package com.codeswear.jwt;

public class AuthenticationResponse {
	private String jwtToken;
	private String userName;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getJwtToken() {
		return jwtToken;
	}

	

	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}

	public AuthenticationResponse(String jwtToken, String userName) {
		super();
		this.jwtToken = jwtToken;
		this.userName = userName;
	}

}
