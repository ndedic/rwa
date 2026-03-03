package ba.fet.rwa.lv09;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class BlogServlet
 */
@WebServlet("/BlogServlet")
public class BlogServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BlogServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub	
		request.getRequestDispatcher("/WEB-INF/add-blog.jsp").forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Blog blog = new Blog(UUID.randomUUID().toString(), request.getParameter("headline"), request.getParameter("text"));
		BlogService.getInstance().save(blog);
		request.setAttribute("data", BlogService.getInstance().findAll());
		request.getRequestDispatcher("/WEB-INF/view-blog.jsp").forward(request, response);
	}

}
