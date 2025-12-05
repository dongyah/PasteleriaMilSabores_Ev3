package com.example.backend.BackEnd.jwt; // Ajusta este paquete

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JwtService {

    // Clave secreta inyectada desde application.properties (verificación en ApplicationConfig)
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;
    
    // Tiempo de expiración inyectado desde application.properties
    @Value("${application.security.jwt.expiration}")
    private long jwtExpiration; 

    // -----------------------------------------------------------------
    // A. Extracción de Información del Token
    // -----------------------------------------------------------------

    /** Extrae el 'username' (correo) desde el token (Subject) */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // -----------------------------------------------------------------
    // B. Generación de Tokens
    // -----------------------------------------------------------------

    /** Genera un token sin claims adicionales */
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    /** Genera el token, incluyendo los roles del usuario como 'claims' extra */
    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        // Mapear los roles a un String separado por comas
        String roles = userDetails.getAuthorities().stream()
                                  .map(GrantedAuthority::getAuthority)
                                  .collect(Collectors.joining(","));
        extraClaims.put("roles", roles); 

        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // -----------------------------------------------------------------
    // C. Validación de Tokens
    // -----------------------------------------------------------------

    /** Valida que el token pertenezca al usuario y no esté expirado */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // -----------------------------------------------------------------
    // D. Obtener la Clave Secreta para Firmar
    // -----------------------------------------------------------------

    private Key getSigningKey() {
        // Decodifica la clave secreta (Base64) para generar la clave de firma
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}