package com.constructionplanning.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/")
public class AppController {
    @GetMapping
    public String testApp() {
        return "Hello world";
    }
}
