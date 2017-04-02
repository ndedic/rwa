package ba.fet.quizmanager.servlet;

import java.io.IOException;
import java.nio.file.attribute.UserPrincipalLookupService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ba.fet.quizmanager.entity.Quiz;
import ba.fet.quizmanager.entity.User;
import ba.fet.quizmanager.service.QuizService;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet(description = "Admin entry point", urlPatterns = { "/login" })
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LoginServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		if (request.getParameter("logout") != null) {
			request.getSession().invalidate();
		}

		request.getRequestDispatcher("/WEB-INF/login.jsp").forward(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String username = request.getParameter("username");
		String password = request.getParameter("password");
		Map<String, String> messages = new HashMap<String, String>();

		System.out.println("username:" + username);
		System.out.println("password:" + password);

		if (username == null || username.isEmpty()) {
			messages.put("username", "Please enter username");
		}

		if (password == null || password.isEmpty()) {
			messages.put("password", "Please enter password");
		}

		if (messages.isEmpty()) {

			User user = new User();
			user.setUsername(username);
			user.setPassword(password);
			user.setFirstName("Nedim");
			user.setLastName("Dedic");

			QuizService qs = new QuizService();
			List<Quiz> quizList = qs.findAll();

			System.out.println("Size of quiz items:" + quizList.size());

			if (user.getPassword().equals("asd")) {
				request.getSession().setAttribute("user", user);
				response.sendRedirect(request.getContextPath() + "/admin/home");
				return;
			} else {
				messages.put("login", "Unknown login, please try again");
			}
		}

		request.setAttribute("messages", messages);
		request.getRequestDispatcher("/WEB-INF/login.jsp").forward(request, response);
	}

}
