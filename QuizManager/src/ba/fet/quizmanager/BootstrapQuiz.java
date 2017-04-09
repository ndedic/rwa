package ba.fet.quizmanager;

import java.util.LinkedHashSet;
import java.util.Set;

import ba.fet.quizmanager.entity.Answer;
import ba.fet.quizmanager.entity.ChoiceType;
import ba.fet.quizmanager.entity.Question;
import ba.fet.quizmanager.entity.Quiz;
import ba.fet.quizmanager.service.QuizService;

public class BootstrapQuiz {
	
	public static void main(String []args) {
		
		QuizService qd = new QuizService();
		qd.findAll();
		
		Set<Answer> answers = new LinkedHashSet<Answer>();
		
		Answer a1 = new Answer();
		a1.setText("JavaScript is designed for creating network-centric applications.");
		a1.setIsCorrect(true);
				
		Answer a2 = new Answer();
		a2.setText("JavaScript is a lightweight, interpreted programming language.");
		a2.setIsCorrect(true);

		Answer a3 = new Answer();
		a2.setText("All of the above");
		a2.setIsCorrect(true);		
		
		answers.add(a1);
		answers.add(a2);
		answers.add(a3);
		
		Question q = new Question();
		q.setText("Which of the following is correct about features of JavaScript?");
		q.setAnswers(answers);
		q.setChoiceType(ChoiceType.MULTIPLE);
		
		Set<Question> questions = new LinkedHashSet<Question>();
		questions.add(q);
		
		Quiz qz = new Quiz();
		qz.setName("JavaScript quiz");
		qz.setQuestions(questions);
		
		qd.save(qz);
	}
}