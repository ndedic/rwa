package ba.fet.rwa.lv10.dao;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public abstract class AbstractDao {

	private static final String PERSISTENCE_UNIT = "lv10example";

	public EntityManager createEntityManager() {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT);
		return emf.createEntityManager();
	}
}