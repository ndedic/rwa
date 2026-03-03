package com.example.blog.servlet;

import com.example.blog.model.BlogEntry;
import com.example.blog.service.BlogService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@WebServlet(name = "ViewBlogEntryServlet", urlPatterns = {"/blog/*"})
public class ViewBlogEntryServlet extends HttpServlet {
    
    private final BlogService blogService = new BlogService();
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        
        if (pathInfo == null || pathInfo.equals("/")) {
            response.sendRedirect(request.getContextPath() + "/blogs");
            return;
        }
        
        try {
            Long id = Long.parseLong(pathInfo.substring(1));
            Optional<BlogEntry> blogEntry = blogService.getBlogEntryById(id);
            
            if (blogEntry.isPresent()) {
                request.setAttribute("blogEntry", blogEntry.get());
                request.getRequestDispatcher("/WEB-INF/views/view-blog.jsp").forward(request, response);
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Blog entry not found");
            }
        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid blog entry ID");
        }
    }
}