package com.example.blog.rest;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

@ApplicationPath("/api")
public class BlogRestApplication extends Application {
    // Jersey will automatically discover our resource classes
}
