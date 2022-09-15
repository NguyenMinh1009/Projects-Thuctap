package com.example.facebook.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.stereotype.Component;

import com.example.facebook.entity.User;
import com.example.facebook.model.TokenPayload;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenUtil {

    private final static String secret = "QUAN_DZ";

    public String generateToken(User user, long expiredDate) {
        Map<String, Object> claims = new HashMap<>();
        TokenPayload tokenPayload = TokenPayload.builder().userId(user.getId()).email(user.getEmail()).build();
        claims.put("payload", tokenPayload);
        return Jwts.builder().setClaims(claims).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiredDate * 1000))
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    public static TokenPayload getTokenPayLoad(String token) {
        return getClaimFromToken(token, (Claims claim) -> {
            Map<String, Object> mapResult = (Map<String, Object>) claim.get("payload");
            return TokenPayload.builder().userId((int) mapResult.get("userId")).email((String) mapResult.get(("email")))
                    .build();
        });
    }

    private static <T> T getClaimFromToken(String token, Function<Claims, T> claimResolver) {
        final Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        return claimResolver.apply(claims);
    }

    public static boolean validate(String token, User user) {
        TokenPayload tokenPayload = getTokenPayLoad(token);
        return tokenPayload.getUserId() == user.getId() && tokenPayload.getEmail().equals(user.getEmail())
                && !isTokenExpired(token);
    }

    private static boolean isTokenExpired(String token) {
        Date expiredDate = getClaimFromToken(token, Claims::getExpiration);
        return expiredDate.before(new Date());
    }
}
