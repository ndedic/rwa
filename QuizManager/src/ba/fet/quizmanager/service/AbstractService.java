package ba.fet.quizmanager.service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public abstract class AbstractService {

	private static final String PERSISTENCE_UNIT = "quiz-manager";

	public EntityManager createEntityManager() {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT);
		return emf.createEntityManager();
	}
}
