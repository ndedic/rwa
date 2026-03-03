package com.example;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class TodoApiServlet
 * Returns a list of programming-related todo items as JSON
 */
@WebServlet("/todo-api")
public class TodoApiServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TodoApiServlet() {
        super();
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     * Returns a list of todo items as JSON
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set response content type to JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        // Create a list of todo items
        List<TodoItem> todoItems = new ArrayList<>();
        
        // Add programming-related todo items
        todoItems.add(new TodoItem("Implement user authentication system", false));
        todoItems.add(new TodoItem("Fix cross-browser compatibility issues", true));
        todoItems.add(new TodoItem("Optimize database queries for better performance", false));
        todoItems.add(new TodoItem("Write unit tests for the API endpoints", false));
        todoItems.add(new TodoItem("Refactor legacy code to follow SOLID principles", true));
        todoItems.add(new TodoItem("Set up CI/CD pipeline for automated deployments", true));
        todoItems.add(new TodoItem("Implement responsive design for mobile devices", false));
        todoItems.add(new TodoItem("Add logging and error handling to the application", true));
        todoItems.add(new TodoItem("Create documentation for the REST API", false));
        todoItems.add(new TodoItem("Conduct security audit and fix vulnerabilities", false));
        
        // Convert the list to JSON using Gson
        Gson gson = new Gson();
        String jsonOutput = gson.toJson(todoItems);
        
        // Write JSON to response
        PrintWriter out = response.getWriter();
        out.print(jsonOutput);
        out.flush();
    }
}