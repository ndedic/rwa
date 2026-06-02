package com.example.blog.servlet;

import com.example.blog.model.User;
import com.example.blog.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.util.Optional;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    
    private UserService userService;
    
    @Override
    public void init() throws ServletException {
        userService = new UserService();
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Check if user is already logged in
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("user") != null) {
            response.sendRedirect(request.getContextPath() + "/blogs");
            return;
        }
        
        // Forward to login page
        request.getRequestDispatcher("/WEB-INF/views/login.jsp").forward(request, response);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String rememberMe = request.getParameter("rememberMe");
        
        // Validate input
        if (username == null || username.trim().isEmpty() || 
            password == null || password.trim().isEmpty()) {
            request.setAttribute("error", "Username and password are required");
            request.getRequestDispatcher("/WEB-INF/views/login.jsp").forward(request, response);
            return;
        }
        
        // Authenticate user
        if (userService.authenticate(username, password)) {
            Optional<User> userOpt = userService.getUserByUsername(username);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                
                // Create session
                HttpSession session = request.getSession(true);
                session.setAttribute("user", user);
                session.setAttribute("username", user.getUsername());
                session.setAttribute("role", user.getRole().toString());
                
                // Set session timeout to 30 minutes
                session.setMaxInactiveInterval(30 * 60);
                
                // Handle "Remember Me" functionality
                if (rememberMe != null && rememberMe.equals("on")) {
                    Cookie usernameCookie = new Cookie("username", username);
                    usernameCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
                    usernameCookie.setHttpOnly(true);
                    usernameCookie.setSecure(request.isSecure());
                    usernameCookie.setPath(request.getContextPath());
                    response.addCookie(usernameCookie);
                }
                
                // Redirect to blogs page
                response.sendRedirect(request.getContextPath() + "/blogs");
            } else {
                request.setAttribute("error", "Authentication failed");
                request.getRequestDispatcher("/WEB-INF/views/login.jsp").forward(request, response);
            }
        } else {
            request.setAttribute("error", "Invalid username or password");
            request.getRequestDispatcher("/WEB-INF/views/login.jsp").forward(request, response);
        }
    }
}
