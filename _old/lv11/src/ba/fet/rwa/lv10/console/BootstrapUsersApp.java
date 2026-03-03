package ba.fet.rwa.lv10.console;

import ba.fet.rwa.lv10.dao.UserDao;
import ba.fet.rwa.lv10.domain.User;
import ba.fet.rwa.lv10.service.UserService;

public class BootstrapUsersApp {

	public static void main(String[] args) {

		UserService userService = new UserService(new UserDao());

		if (userService.findByUsername("dritchie") == null) {
			
			User user = new User();

			user.setFirstName("Dennis");
			user.setLastName("Ritchie");
			user.setUsername("dritchie");
			user.setPassword("fet.ba");

			userService.create(user);
			
		} 

		if (userService.findByUsername("rpike") == null) {
			
			User user = new User();

			user.setFirstName("Rob");
			user.setLastName("Pike");
			user.setUsername("rpike");
			user.setPassword("fet.ba");

			userService.create(user);
			
		} 			
	}
}
