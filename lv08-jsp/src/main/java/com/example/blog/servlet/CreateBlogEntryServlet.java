package com.example.blog.servlet;

import com.example.blog.model.BlogEntry;
import com.example.blog.service.BlogService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "CreateBlogEntryServlet", urlPatterns = {"/create"})
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
        
        BlogEntry blogEntry = new BlogEntry();
        blogEntry.setTitle(title);
        blogEntry.setContent(content);
        
        blogService.saveBlogEntry(blogEntry);
        
        response.sendRedirect(request.getContextPath() + "/blogs");
    }
}