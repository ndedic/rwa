package ba.fet.quizmanager.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import ba.fet.quizmanager.entity.Quiz;
import ba.fet.quizmanager.service.QuizService;

/**
 * Servlet implementation class HomeServlet
 */
@WebServlet(description = "This is a home servlet", urlPatterns = { "/api/quizzes" })
public class QuizApiServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private QuizService qd;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public QuizApiServlet() {
	}

	@Override
	public void init() {
		qd = new QuizService();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		List<Quiz> quizList = qd.findAll();
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(new Gson().toJson(quizList));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
