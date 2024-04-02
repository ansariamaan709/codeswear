package com.codeswear.jwt;

//AuthServiceImpl.java
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;

@Service
public class AuthServiceImpl implements AuthService {

 private final AuthenticationManager authenticationManager;
 private final UserDetailsService userDetailsService;
 private final BCryptPasswordEncoder passwordEncoder;

 private final String secret = "afafasfafafasfasfasfafacasdasfasxASFACASDFACASDFASFASFDAFASFASDAADSCSDFADCVSGCFVADXCcadwavfsfarvf";

 @Value("${jwt.expiration}")
 private long jwtExpiration;

 public AuthServiceImpl(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, BCryptPasswordEncoder passwordEncoder) {
     this.authenticationManager = authenticationManager;
     this.userDetailsService = userDetailsService;
     this.passwordEncoder = passwordEncoder;
 }

 @Override
 public String authenticate(String username, String password,Collection<? extends GrantedAuthority> authorities) {
     Authentication authentication = authenticationManager.authenticate(
             new UsernamePasswordAuthenticationToken(username, password,authorities)
     );

     UserDetails userDetails = userDetailsService.loadUserByUsername(username);

     return generateToken(userDetails);
 }
 
 public Boolean authenticatedRequest(String username, String password,Collection<? extends GrantedAuthority> authorities) {
     Authentication authentication = authenticationManager.authenticate(
             new UsernamePasswordAuthenticationToken(username, password,authorities)
             
     );
     return authentication.isAuthenticated();
 }

 String generateToken(UserDetails userDetails) {
     Date now = new Date();
     Date expirationDate = new Date(now.getTime() + jwtExpiration);

     return Jwts.builder()
             .setSubject(userDetails.getUsername())
             .setIssuedAt(now)
             .setExpiration(expirationDate)
             .signWith(SignatureAlgorithm.HS512, secret)
             .compact();
 }
}

