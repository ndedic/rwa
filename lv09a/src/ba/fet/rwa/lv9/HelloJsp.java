package ba.fet.rwa.lv09;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class HelloJsp
 */
@WebServlet("/HelloJsp")
public class HelloJsp extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HelloJsp() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		request.getRequestDispatcher("/WEB-INF/home.jsp").forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		Map<String, String> data = new HashMap<>();
		
	    String name = request.getParameter("name");
	    String pass = request.getParameter("pass");
	    String gender = request.getParameter("gender");
	    boolean agree = request.getParameter("agree") != null;
	    String[] roles = request.getParameterValues("role");
	    String countryCode = request.getParameter("countryCode");
	    String[] animalIds = request.getParameterValues("animalId");
	    String message = request.getParameter("message");
	    boolean submitButtonPressed = request.getParameter("submit") != null;
	    
	    data.put("name", name);
	    
		request.getRequestDispatcher("/WEB-INF/result.jsp").forward(request, response);

	}

}
