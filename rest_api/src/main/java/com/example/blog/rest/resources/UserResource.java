package com.example.blog.rest;

import com.example.blog.model.User;
import com.example.blog.service.UserService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Resource for User operations
 * Currently only supports listing users with sensitive data removed
 */
@Path("/users")
public class UserResource {
    
    private UserService userService = new UserService();
    
    /**
     * Get all users with sensitive information removed
     * @return List of users as DTOs without password information
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUsers() {
        // Get all users from the service
        List<User> users = userService.getAllUsers();
        
        // Convert users to DTOs to exclude sensitive information
        List<UserDTO> userDTOs = users.stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
        
        return Response.ok(userDTOs).build();
    }
}
