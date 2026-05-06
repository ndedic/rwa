package com.example.blog.cli;

import com.example.blog.model.Role;
import com.example.blog.model.User;
import com.example.blog.service.UserService;
import com.example.blog.util.JPAUtil;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class UserDataGenerator {

    public static void main(String[] args) {
        UserService userService = new UserService();

        try {
            // Create admin user
            User adminUser = createUser("admin", "Admin", "User", "admin@example.com", "admin123", Role.ADMIN);
            userService.createUser(adminUser);
            System.out.println("Created admin user: " + adminUser.getUsername());

            // Create editor user
            User editorUser = createUser("editor", "Editor", "User", "editor@example.com", "editor123", Role.EDITOR);
            userService.createUser(editorUser);
            System.out.println("Created editor user: " + editorUser.getUsername());

            System.out.println("User data generation completed successfully!");
        } catch (Exception e) {
            System.err.println("Error generating user data: " + e.getMessage());
            e.printStackTrace();
        } finally {
            // Close the EntityManagerFactory
            JPAUtil.shutdown();
        }
    }

    private static User createUser(String username, String firstname, String lastname,
                                  String email, String password, Role role) {
        User user = new User();
        user.setUsername(username);
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);
        return user;
    }
}
