package com.example.blog.servlet;

import com.example.blog.model.BlogEntry;
import com.example.blog.service.BlogService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "ListBlogEntriesServlet", urlPatterns = {"/blogs"})
public class ListBlogEntriesServlet extends HttpServlet {
    
    private final BlogService blogService = new BlogService();
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<BlogEntry> blogEntries = blogService.getAllBlogEntries();
        request.setAttribute("blogEntries", blogEntries);
        request.getRequestDispatcher("/WEB-INF/views/list-blogs.jsp").forward(request, response);
    }
}