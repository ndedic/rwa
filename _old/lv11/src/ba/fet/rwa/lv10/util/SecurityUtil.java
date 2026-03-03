package ba.fet.rwa.lv10.util;

import org.mindrot.jbcrypt.BCrypt;

public class SecurityUtil {
	
	public static String hashPassword(String password) {
		return BCrypt.hashpw(password, BCrypt.gensalt());
	}
	
	public static boolean checkPassword(String candidate, String hashed) {
		return BCrypt.checkpw(candidate, hashed);
	}		
}
