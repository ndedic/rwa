package ba.fet.rwa.lv08;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class HelloCookie
 */
@WebServlet("/HelloCookie")
public class HelloCookie extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HelloCookie() {
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
		
		out.println("<head><title>Hello cookie</title></head>");
		out.println("<body>");
		out.println("<form action=\"/Cookies/HelloCookie\" method=\"post\">");
		out.println("Your name: <br/>");
		out.println("<input type=\"text\" name=\"name\"/><br/>");
		out.println("Favourite colour: <br/>");
		out.println("<input type=\"text\" name=\"colour\"/><br/>");
		out.println("<input type=\"submit\" value=\"Save\"/>");
		out.println("</form>");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		// read request parameters and set as response as cookies
	}

}
