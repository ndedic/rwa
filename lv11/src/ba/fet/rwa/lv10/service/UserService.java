package ba.fet.rwa.lv10.service;

import java.util.List;

import ba.fet.rwa.lv10.dao.UserDao;
import ba.fet.rwa.lv10.domain.User;
import ba.fet.rwa.lv10.util.SecurityUtil;

public class UserService {
	
	private UserDao userDao;
	
	public UserService(UserDao userDao) {
		this.userDao = userDao;
	}
	
	public void create(User user) {
		user.setPassword(SecurityUtil.hashPassword(user.getPassword()));
		userDao.save(user);	
	}
	
	public List<User> findAll() {
		return userDao.findAll();
	}
	
	public User findByUsername(String username) {
		return userDao.findByUsername(username);
	}
	
	public User authenticate(String username, String password) {
		
		User user = findByUsername(username);
		
		if (user == null) {
			return null;
		}
		
		if (SecurityUtil.checkPassword(password, user.getPassword())) {
			user.setPassword("");
			return user;
		}
		
		return null;
	}
}
