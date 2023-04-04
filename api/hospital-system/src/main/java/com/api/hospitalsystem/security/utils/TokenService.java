package com.api.hospitalsystem.security.utils;

import com.api.hospitalsystem.service.impl.user.DetailUserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.HashSet;
import java.util.Set;

@Service
public class TokenService {


    @Autowired
    private DetailUserServiceImpl detailUserService;

    private Set<String> tokenBlacklist = new HashSet<>();

    @Autowired
    private JWTUtil jwtUtil;

    public boolean isTokenBlacklisted(String token) {
        return tokenBlacklist.contains(token);
    }

    public void addToBlacklist(String token) {
        tokenBlacklist.add(token);
    }

    public String extractToken(String authorizationHeader) {
        if (StringUtils.hasText(authorizationHeader) && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }

    public boolean isTokenValid(String token) {
        if (isTokenBlacklisted(token)) {
            return false;
        }

        String username = jwtUtil.extractUsername(token);
        UserDetails userDetails = detailUserService.loadUserByUsername(username);
        return jwtUtil.validateToken(token, userDetails);
    }

}
