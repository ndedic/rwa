package ba.fet.rwa.lv10.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import ba.fet.rwa.lv10.domain.User;

final public class UserDao extends AbstractDao {
	
	public void UserDao() {
		
	}
	
	public List<User> findAll() {
		EntityManager em = createEntityManager();
		Query q = em.createQuery("SELECT u FROM User u");
		List<User> resultList = q.getResultList();
		em.close();
		return resultList;
	}
	
	public User findByUsername(String username) {
		EntityManager em = createEntityManager();
		try {
			Query q = em.createQuery("SELECT u FROM User u WHERE u.username = :username").setParameter("username", username);
			User user = (User) q.getSingleResult();
			return user;					
		} catch (RuntimeException e) {
			System.out.println(e.getMessage());
		} finally {		
			if (em!= null) {
				em.close();
			}
		}		
		return null;
	}
	
	public void save(User user) {
		EntityManager em = createEntityManager();
		em.getTransaction().begin();
		em.persist(user);
		em.getTransaction().commit();
		em.close();	
	}
}