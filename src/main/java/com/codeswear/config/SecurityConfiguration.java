package com.codeswear.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.codeswear.jwt.JwtAuthenticationEntryPoint;
import com.codeswear.jwt.JwtRequestFilter;





@Configuration
public class SecurityConfiguration {
	
	@Autowired
    private JwtRequestFilter jwtRequestFilter;
	
	@Autowired
	private JwtAuthenticationEntryPoint point;

	@Autowired
	private UserDetailsService userDetailsService;
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider daoAuth = new DaoAuthenticationProvider();
		daoAuth.setUserDetailsService(userDetailsService);
		daoAuth.setPasswordEncoder(passwordEncoder());
		
		return daoAuth;
	}
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider()); // Register your custom AuthenticationProvider
       
    }
	
	
    @Bean
    protected DefaultSecurityFilterChain configure(HttpSecurity http) throws Exception {
    	http.cors();
    	http.csrf(csrf -> csrf.disable())
        .authorizeRequests().
        requestMatchers("/api/user/signup","/register", "/signup", "/authenticate", "/notification", "/password", "/swagger-ui/index.html", "/v3/api-docs", "/configuration/ui", "/swagger-resources/**",
                "/configuration/security", "/swagger-ui/*", "/webjars/**", "/v3/**", "/user/**").permitAll()
       .anyRequest().authenticated() 
        .and()
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        ;
http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
return http.build();
}


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }
   
}
