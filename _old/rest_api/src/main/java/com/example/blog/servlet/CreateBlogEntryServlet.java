package com.example.blog.servlet;

import com.example.blog.model.BlogEntry;
import com.example.blog.model.User;
import com.example.blog.service.BlogService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet(name = "CreateBlogEntryServlet", urlPatterns = {"/create-blog"})
public class CreateBlogEntryServlet extends HttpServlet {
    
    private final BlogService blogService = new BlogService();
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/WEB-INF/views/create-blog.jsp").forward(request, response);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String title = request.getParameter("title");
        String content = request.getParameter("content");
        
        // Simple validation
        if (title == null || title.trim().isEmpty() || content == null || content.trim().isEmpty()) {
            request.setAttribute("error", "Title and content are required");
            request.setAttribute("title", title);
            request.setAttribute("content", content);
            request.getRequestDispatcher("/WEB-INF/views/create-blog.jsp").forward(request, response);
            return;
        }
        
        // Sanitize input to prevent XSS
        title = sanitizeInput(title);
        content = sanitizeInput(content);
        
        // Get the current logged-in user
        HttpSession session = request.getSession(false);
        User currentUser = null;
        
        if (session != null && session.getAttribute("user") != null) {
            currentUser = (User) session.getAttribute("user");
        } else {
            // This should not happen due to AuthFilter, but just in case
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }
        
        BlogEntry blogEntry = new BlogEntry();
        blogEntry.setTitle(title);
        blogEntry.setContent(content);
        blogEntry.setCreatedBy(currentUser);
        
        blogService.saveBlogEntry(blogEntry);
        
        response.sendRedirect(request.getContextPath() + "/blogs");
    }
    
    private String sanitizeInput(String input) {
        if (input == null) {
            return null;
        }
        
        // Replace HTML special characters with their entity equivalents
        return input.replace("<", "&lt;")
                   .replace(">", "&gt;")
                   .replace("\"", "&quot;")
                   .replace("'", "&#39;")
                   .replace("&", "&amp;");
    }
}
