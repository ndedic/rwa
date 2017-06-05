package ba.fet.rwa.lv10.servlet;

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

import ba.fet.rwa.lv10.dao.UserDao;
import ba.fet.rwa.lv10.domain.User;
import ba.fet.rwa.lv10.service.UserService;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet(description = "Admin entry point", urlPatterns = { "/login" })
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private UserService userService;

	public LoginServlet() {
		super();
		userService = new UserService(new UserDao());
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		if (request.getParameter("logout") != null) {
			request.getSession().invalidate();
		}

		request.getRequestDispatcher("/login.jsp").forward(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String username = request.getParameter("username");
		String password = request.getParameter("password");
		Map<String, String> messages = new HashMap<String, String>();

		if (username == null || username.isEmpty()) {
			messages.put("username", "Please enter a username");
		}

		if (password == null || password.isEmpty()) {
			messages.put("password", "Please enter a password");
		}

		if (messages.isEmpty()) {

			User user = userService.authenticate(username, password);

			if (user != null) {
				request.getSession().setAttribute("user", user);
				response.sendRedirect(request.getContextPath() + "/admin/home");
				return;
			} else {
				messages.put("login", "Unknown login, please try again");
			}
		}

		request.setAttribute("messages", messages);
		request.getRequestDispatcher("/login.jsp").forward(request, response);
	}

}
