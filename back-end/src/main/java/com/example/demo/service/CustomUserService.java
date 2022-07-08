package com.constructionplanning.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.constructionplanning.app.model.User;
import com.constructionplanning.app.model.UserPrincipal;
import com.constructionplanning.app.repository.UserDetailsRepository;

@Service
public class CustomUserService implements UserDetailsService {
    @Autowired
    UserDetailsRepository userDetailsRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        User user = userDetailsRepository.findByUserName(username);
        if (user == null) {
            throw new UsernameNotFoundException("User Not Found with username " + username);
        }

        return new UserPrincipal(user);
    }

}
