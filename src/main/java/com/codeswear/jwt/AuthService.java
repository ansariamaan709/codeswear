package com.codeswear.jwt;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

// AuthService.java
public interface AuthService {
    String authenticate(String username, String password,Collection<? extends GrantedAuthority> authorities);
    
    Boolean authenticatedRequest(String username, String password,Collection<? extends GrantedAuthority> authorities);
}
