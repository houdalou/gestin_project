package com.example.backend.service;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


import javax.crypto.SecretKey;

import java.util.Date;



@Service
public class JwtService {



    private final SecretKey key;

    private final long expiration;



    public JwtService(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration}") long expiration
    ){


        this.key = Keys.hmacShaKeyFor(
                secret.getBytes()
        );


        this.expiration = expiration;

    }





    public String generateToken(String username){


        return Jwts.builder()

                .subject(username)

                .issuedAt(new Date())

                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + expiration
                        )
                )

                .signWith(key)

                .compact();

    }





    public String extractUsername(String token){


        return Jwts.parser()

                .verifyWith(key)

                .build()

                .parseSignedClaims(token)

                .getPayload()
                .getSubject();

    }





    public boolean isTokenValid(
            String token,
            org.springframework.security.core.userdetails.UserDetails userDetails
    ){


        String username = extractUsername(token);


        return username.equals(
                userDetails.getUsername()
        )
                &&
                !isExpired(token);

    }





    private boolean isExpired(String token){


        return Jwts.parser()

                .verifyWith(key)

                .build()

                .parseSignedClaims(token)

                .getPayload()
                .getExpiration()
                .before(new Date());

    }

}