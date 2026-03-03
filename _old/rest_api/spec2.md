# REST API Integration Specification

## Overview
This document outlines the integration of a Jersey-based REST API into the existing Java Servlets blog application. The integration will add REST endpoints while maintaining the current servlet-based functionality.

## Technical Approach

### Dependencies
Add the following dependencies to the Gradle build file:

```gradle
dependencies {
    // Jersey dependencies
    implementation 'org.glassfish.jersey.containers:jersey-container-servlet:3.1.3'
    implementation 'org.glassfish.jersey.inject:jersey-hk2:3.1.3'
    implementation 'org.glassfish.jersey.media:jersey-media-json-jackson:3.1.3'
    implementation 'com.fasterxml.jackson.core:jackson-databind:2.15.2'
    implementation 'com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.15.2'
}
```

### REST Application Configuration
Create a REST application configuration class to define the base path for the API:

```java
package com.example.blog.rest;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

@ApplicationPath("/api")
public class BlogRestApplication extends Application {
    // Jersey will automatically discover our resource classes
}
```

### Jackson Configuration for Java 8 Date/Time Types
Create a Jackson configuration provider to handle Java 8 date/time types:

```java
package com.example.blog.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.ws.rs.ext.ContextResolver;
import jakarta.ws.rs.ext.Provider;

@Provider
public class JacksonConfig implements ContextResolver<ObjectMapper> {
    
    private final ObjectMapper objectMapper;
    
    public JacksonConfig() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
    }
    
    @Override
    public ObjectMapper getContext(Class<?> type) {
        return objectMapper;
    }
}
```

### REST Resource Implementation
Create a BlogResource class to implement the REST endpoints:

```java
package com.example.blog.rest;

import com.example.blog.model.BlogEntry;
import com.example.blog.service.BlogService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/blogs")
public class BlogResource {
    
    private BlogService blogService = new BlogService();
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllBlogs(
            @QueryParam("page") Integer page,
            @QueryParam("size") Integer size) {
        
        // Default pagination values if not provided
        int pageNumber = (page != null) ? page : 1;
        int pageSize = (size != null) ? size : 10;
        
        List<BlogEntry> blogs = blogService.getAllBlogs(pageNumber, pageSize);
        return Response.ok(blogs).build();
    }
    
    // Additional endpoints for CRUD operations
}
```

## API Endpoints

### List Blogs
- **URL**: `/api/blogs`
- **Method**: GET
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `size` (optional): Page size (default: 10)
- **Response Format**: JSON
- **Example Response**:
  ```json
  [
    {
      "id": 1,
      "title": "Introduction to Java",
      "content": "Java is a versatile programming language...",
      "author": "John Doe",
      "publishDate": "2025-05-20T10:30:00"
    },
    {
      "id": 2,
      "title": "REST API Best Practices",
      "content": "When designing REST APIs...",
      "author": "Jane Smith",
      "publishDate": "2025-05-22T14:15:00"
    }
  ]
  ```

### Get Blog by ID
- **URL**: `/api/blogs/{id}`
- **Method**: GET
- **Path Parameters**:
  - `id`: Blog entry ID
- **Response Format**: JSON
- **Example Response**:
  ```json
  {
    "id": 1,
    "title": "Introduction to Java",
    "content": "Java is a versatile programming language...",
    "author": "John Doe",
    "publishDate": "2025-05-20T10:30:00"
  }
  ```
- **Error Response** (404 Not Found):
  ```json
  "Blog with ID 1 not found"
  ```

### Create Blog
- **URL**: `/api/blogs`
- **Method**: POST
- **Request Format**: JSON
- **Request Body**:
  ```json
  {
    "title": "New Blog Post",
    "content": "This is the content of the new blog post...",
    "userId": 1
  }
  ```
- **Response Format**: JSON
- **Response Status**: 201 Created
- **Example Response**:
  ```json
  {
    "id": 3,
    "title": "New Blog Post",
    "content": "This is the content of the new blog post...",
    "createdBy": {
      "id": 1,
      "username": "admin",
      "firstname": "Admin",
      "lastname": "User",
      "email": "admin@example.com",
      "role": "ADMIN"
    },
    "createdAt": "2025-05-28T18:30:00",
    "updatedAt": null
  }
  ```
- **Error Response** (400 Bad Request):
  ```json
  "Title, content, and userId are required fields"
  ```

### Update Blog
- **URL**: `/api/blogs/{id}`
- **Method**: PUT
- **Path Parameters**:
  - `id`: Blog entry ID
- **Request Format**: JSON
- **Request Body**:
  ```json
  {
    "title": "Updated Blog Title",
    "content": "Updated content of the blog post..."
  }
  ```
- **Response Format**: JSON
- **Example Response**:
  ```json
  {
    "id": 1,
    "title": "Updated Blog Title",
    "content": "Updated content of the blog post...",
    "createdBy": {
      "id": 1,
      "username": "admin",
      "firstname": "Admin",
      "lastname": "User",
      "email": "admin@example.com",
      "role": "ADMIN"
    },
    "createdAt": "2025-05-20T10:30:00",
    "updatedAt": "2025-05-28T18:45:00"
  }
  ```
- **Error Response** (404 Not Found):
  ```json
  "Blog with ID 1 not found"
  ```

### Delete Blog
- **URL**: `/api/blogs/{id}`
- **Method**: DELETE
- **Path Parameters**:
  - `id`: Blog entry ID
- **Response Status**: 204 No Content
- **Error Response** (404 Not Found):
  ```json
  "Blog with ID 1 not found"
  ```

## Integration Notes
- The REST API will coexist with the current servlet-based application
- Both will run within the same application context
- The REST API will be accessible at `http://localhost:8080/blog/api/blogs`
- The existing web UI will continue to function as before

## Implementation Status
- [x] List Blogs endpoint
- [x] Get Blog by ID endpoint
- [x] Create Blog endpoint
- [x] Update Blog endpoint
- [x] Delete Blog endpoint
