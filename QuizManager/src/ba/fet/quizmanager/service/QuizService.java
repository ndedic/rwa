package ba.fet.quizmanager.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import ba.fet.quizmanager.entity.Quiz;

final public class QuizService extends AbstractService {
	
	public QuizService() {
		
	}
	
	public List<Quiz> findAll() {
		EntityManager em = createEntityManager();
		Query q = em.createQuery("SELECT q FROM Quiz q");
		return q.getResultList();
	}
	
	public void save(Quiz quiz) {
		EntityManager em = createEntityManager();
		em.getTransaction().begin();
		em.persist(quiz);
		em.getTransaction().commit();
		em.close();	
	}
}
