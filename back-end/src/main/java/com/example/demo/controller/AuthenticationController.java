package com.constructionplanning.app.controller;

import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.constructionplanning.app.config.JWTTokenHelper;
import com.constructionplanning.app.model.User;
import com.constructionplanning.app.model.UserPrincipal;
import com.constructionplanning.app.requests.AuthenticationRequest;
import com.constructionplanning.app.responses.LoginResponse;
import com.constructionplanning.app.responses.UserInfo;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    JWTTokenHelper jWTTokenHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest)
            throws InvalidKeySpecException, NoSuchAlgorithmException {

        final Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUserName(),
                        authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        Object principal = authentication.getPrincipal();

        System.out.println(principal.getClass());

        User user = ((UserPrincipal) authentication.getPrincipal()).getUser();

        String jwtToken = jWTTokenHelper.generateToken(user.getUserName());

        LoginResponse response = new LoginResponse();
        response.setToken(jwtToken);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/auth/userinfo")
    public ResponseEntity<?> getUserInfo(Principal user) {

        User userObj = ((UserPrincipal) userDetailsService.loadUserByUsername(user.getName())).getUser();

        UserInfo userInfo = new UserInfo();
        userInfo.setFirstName(userObj.getFirstName());
        userInfo.setLastName(userObj.getLastName());
        userInfo.setRoles(userObj.getAuthorities().toArray());

        return ResponseEntity.ok(userInfo);

    }
}