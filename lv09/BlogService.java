package ba.fet.rwa.lv09;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

public class BlogService {

	private static BlogService instance = null;
	private List<Blog> data = new ArrayList<>();
	
	private BlogService() {
		
	}
	
	// unsafe, don't try this at home
	public static BlogService getInstance() {
		if (instance != null) {
			return instance;
		}
		instance = new BlogService();
		return instance;
	}
	
	public void save(Blog blog) {
		data.add(blog);
	}
	
	public List<Blog> findAll() {
		return data;
	}
}
