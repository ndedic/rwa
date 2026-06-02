package com.example.blog.rest;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * ASSIGNMENT: Implement a Comment REST resource.
 * 
 * Requirements:
 * 1. GET  /api/blogs/{blogId}/comments → return a hardcoded list of comments (JSON array)
 * 2. POST /api/blogs/{blogId}/comments → accept {"author":"...","text":"..."}, return 201
 * 
 * Hints:
 * - Use @PathParam("blogId") to get the blog ID
 * - For GET, return a List<Map<String, String>> or create a simple Comment class
 * - For POST, create a CommentDTO or use Map<String, String> as input
 * - No database needed — hardcoded data is fine for this exercise
 */
@Path("/blogs/{blogId}/comments")
public class CommentResource {

    // TODO: Implement GET method that returns a list of comments for the given blogId
    

    // TODO: Implement POST method that creates a new comment
    
}
