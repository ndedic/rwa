package com.example;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class HelloCookie
 */
@WebServlet("/HelloCookie")
public class HelloCookieServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HelloCookieServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/html");
	
		PrintWriter out = response.getWriter();

		// get request cookies
		// check if there are relevant cookies set
		// if cookies have been set, display cookies content
		// else display form as per below
		
        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head>");
        out.println("<title>Hello Cookie</title>");
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
        out.println(".nav {");
        out.println("    margin-top: 20px;");
        out.println("}");
        out.println("</style>");
        out.println("</head>");
        out.println("<body>");
        out.println("<h1>Cookie Management Demo (Basic)</h1>");
        
        out.println("<div class=\"container\">");
        out.println("<h2>Please enter your information:</h2>");
        out.println("<form action=\"/HelloCookie\" method=\"post\">");
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
		// read request parameters and set as response as cookies
	}
}