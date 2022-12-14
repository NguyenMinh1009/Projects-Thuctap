package com.example.facebook.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.facebook.entity.User;
import com.example.facebook.exception.custom.CustomTokenException;
import com.example.facebook.model.CustomError;
import com.example.facebook.model.TokenPayload;
import com.example.facebook.repository.UserRepository;
import com.example.facebook.util.JwtTokenUtil;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String requestTokenHeader = request.getHeader("Authorization");

        String token = null;
        TokenPayload tokenPayload = null;
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Token")) {
            token = requestTokenHeader.substring(6).trim();
            try {
                tokenPayload = jwtTokenUtil.getTokenPayLoad(token);

            } catch (SignatureException e) {
                System.out.println("Invalid JWT signature");
                // try {
                //     throw new CustomTokenException(
                //             CustomError.builder().code("4003").message("Error token").build());
                // } catch (CustomTokenException e1) {
                //     e1.printStackTrace();
                // }
            } catch (IllegalArgumentException ex) {
                System.out.println("Unable to get JWT");
                // try {
                //     throw new CustomTokenException(
                //             CustomError.builder().code("4003").message("Error token").build());
                // } catch (CustomTokenException e1) {
                //     e1.printStackTrace();
                // }
            } catch (ExpiredJwtException ex) {
                System.out.println("Token has expired");
                // try {
                //     throw new CustomTokenException(
                //             CustomError.builder().code("4003").message("Error token").build());
                // } catch (CustomTokenException e1) {
                //     e1.printStackTrace();
                // }
            }catch (Exception ex) {
                System.out.println("Token Error");
                try {
                    throw new CustomTokenException(
                            CustomError.builder().code("4003").message("Error token").build());
                } catch (CustomTokenException e1) {
                    e1.printStackTrace();
                }
            }
        } else {
            System.out.println("JWT Token does not start with 'Token' ");
            try {
                throw new CustomTokenException(
                        CustomError.builder().code("4003").message("Error token").build());
            } catch (CustomTokenException e1) {

                e1.printStackTrace();
            }
        }

        if (tokenPayload != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            Optional<User> userOptional = userRepository.findById(tokenPayload.getUserId());
            if (userOptional.isPresent()) {
                User user = userOptional.get();

                // check token co hop le hay ko (check lai lan nua trong database)
                if (JwtTokenUtil.validate(token, user)) {

                    List<SimpleGrantedAuthority> authorities = new ArrayList<>();
                    UserDetails userDetails = new org.springframework.security.core.userdetails.User(user.getEmail(),
                            user.getPassword(), authorities);
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
        }
        filterChain.doFilter(request, response);

    }

}
