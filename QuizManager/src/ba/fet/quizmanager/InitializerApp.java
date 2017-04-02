package ba.fet.quizmanager;

import java.util.HashSet;
import java.util.Set;

import ba.fet.quizmanager.entity.Answer;
import ba.fet.quizmanager.entity.Question;
import ba.fet.quizmanager.entity.Quiz;
import ba.fet.quizmanager.service.QuizService;

public class InitializerApp {
	public static void main(String []args) {
		QuizService qd = new QuizService();
		qd.findAll();
		
		Set<Answer> answers = new HashSet<Answer>();
		
		Answer a1 = new Answer();
		a1.setText("China is 100 years old");
		
		Answer a2 = new Answer();
		a2.setText("Honduras is near Sri Lanka");
		
		answers.add(a1);
		answers.add(a2);
		
		Question q = new Question();
		q.setText("What is true");
		q.setAnswers(answers);
		q.setCorrectAnswer(a2);
		
		Set<Question> questions = new HashSet<Question>();
		questions.add(q);
		
		Quiz qz = new Quiz();
		qz.setName("My first quiz");
		qz.setQuestions(questions);
		
		qd.save(qz);
	}
}
