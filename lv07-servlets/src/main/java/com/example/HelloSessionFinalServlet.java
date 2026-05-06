package com.example;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

/**
 * Servlet implementation class HelloSession
 */
@WebServlet("/HelloSessionFinal")
public class HelloSessionFinalServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HelloSessionFinalServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        // Start HTML document
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head>");
        out.println("<title>Hello Session</title>");
        out.println("<style>");
        out.println("body {");
        out.println("    font-family: Arial, sans-serif;");
        out.println("    line-height: 1.6;");
        out.println("    margin: 0;");
        out.println("    padding: 20px;");
        out.println("    max-width: 800px;");
        out.println("    margin: 0 auto;");
        out.println("}");
        out.println("h1, h2 {");
        out.println("    color: #333;");
        out.println("    border-bottom: 1px solid #ddd;");
        out.println("    padding-bottom: 10px;");
        out.println("}");
        out.println(".container {");
        out.println("    background-color: #f5f5f5;");
        out.println("    padding: 15px;");
        out.println("    border-radius: 5px;");
        out.println("    margin-top: 20px;");
        out.println("}");
        out.println(".form-group {");
        out.println("    margin-bottom: 15px;");
        out.println("}");
        out.println("label {");
        out.println("    display: block;");
        out.println("    margin-bottom: 5px;");
        out.println("    font-weight: bold;");
        out.println("}");
        out.println("input[type='text'] {");
        out.println("    width: 100%;");
        out.println("    padding: 8px;");
        out.println("    border: 1px solid #ddd;");
        out.println("    border-radius: 4px;");
        out.println("    box-sizing: border-box;");
        out.println("}");
        out.println("input[type='submit'] {");
        out.println("    background-color: #0066cc;");
        out.println("    color: white;");
        out.println("    border: none;");
        out.println("    padding: 10px 15px;");
        out.println("    border-radius: 4px;");
        out.println("    cursor: pointer;");
        out.println("    margin-top: 10px;");
        out.println("}");
        out.println("input[type='submit']:hover {");
        out.println("    background-color: #0052a3;");
        out.println("}");
        out.println("a {");
        out.println("    color: #0066cc;");
        out.println("    text-decoration: none;");
        out.println("}");
        out.println("a:hover {");
        out.println("    text-decoration: underline;");
        out.println("}");
        out.println(".info {");
        out.println("    background-color: #e8f4ff;");
        out.println("    border-left: 4px solid #0066cc;");
        out.println("    padding: 10px;");
        out.println("    margin: 10px 0;");
        out.println("}");
        out.println(".nav {");
        out.println("    margin-top: 20px;");
        out.println("}");
        out.println("</style>");
        out.println("</head>");
        out.println("<body>");
        out.println("<h1>Session Management Demo</h1>");
        
        // Get session
        HttpSession session = request.getSession(false); // Don't create a new session if none exists
        boolean hasSessionData = false;
        String name = null;
        String colour = null;
        
        // Check if there are relevant session attributes set
        if (session != null) {
            name = (String) session.getAttribute("name");
            colour = (String) session.getAttribute("colour");
            
            if (name != null || colour != null) {
                hasSessionData = true;
            }
        }
        
        // If session attributes have been set, display session content
        if (hasSessionData) {
            out.println("<div class=\"container\">");
            out.println("<h2>Your stored information:</h2>");
            out.println("<div class=\"info\">");
            out.println("<p><strong>Name:</strong> " + (name != null ? name : "Not set") + "</p>");
            out.println("<p><strong>Favourite colour:</strong> " + (colour != null ? colour : "Not set") + "</p>");
            out.println("</div>");
            out.println("<p><a href=\"/HelloSessionFinal?clear=true\" class=\"btn\">Clear session and start again</a></p>");
            out.println("</div>");
            
            // Check if user wants to clear session
            String clearParam = request.getParameter("clear");
            if (clearParam != null && clearParam.equals("true")) {
                // Invalidate the session
                session.invalidate();
                
                // Redirect to the same page to show the form
                response.sendRedirect("/HelloSessionFinal");
                return;
            }
        } 
        // Else display form
        else {
            out.println("<div class=\"container\">");
            out.println("<h2>Please enter your information:</h2>");
            out.println("<form action=\"/HelloSessionFinal\" method=\"post\">");
            out.println("<div class=\"form-group\">");
            out.println("<label for=\"name\">Your name:</label>");
            out.println("<input type=\"text\" id=\"name\" name=\"name\" required/>");
            out.println("</div>");
            out.println("<div class=\"form-group\">");
            out.println("<label for=\"colour\">Favourite colour:</label>");
            out.println("<input type=\"text\" id=\"colour\" name=\"colour\" required/>");
            out.println("</div>");
            out.println("<input type=\"submit\" value=\"Save\"/>");
            out.println("</form>");
            out.println("</div>");
        }
        
        out.println("<div class=\"nav\">");
        out.println("<p><a href=\"/\">Back to Home</a></p>");
        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Read request parameters
        String name = request.getParameter("name");
        String colour = request.getParameter("colour");
        
        // Get or create session and set attributes
        HttpSession session = request.getSession();
        
        if (name != null && !name.isEmpty()) {
            session.setAttribute("name", name);
        }
        
        if (colour != null && !colour.isEmpty()) {
            session.setAttribute("colour", colour);
        }
        
        // Set session timeout (equivalent to cookie max age)
        session.setMaxInactiveInterval(60 * 60 * 24 * 30); // 30 days in seconds
        
        // Redirect back to the GET handler to display the stored session data
        response.sendRedirect("/HelloSessionFinal");
    }
}