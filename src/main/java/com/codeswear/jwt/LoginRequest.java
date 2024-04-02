package com.codeswear.jwt;

//LoginRequest.java


public class LoginRequest {
	
private String userName;
 
public String getUserName() {
	return userName;
}
public void setUserName(String userName) {
	this.userName = userName;
}
private String password;

@Override
public String toString() {
	return "LoginRequest [userName=" + userName + ", password=" + password + "]";
}
public void setUsername(String username) {
	this.userName = username;
}
public String getPassword() {
	return password;
}
}

