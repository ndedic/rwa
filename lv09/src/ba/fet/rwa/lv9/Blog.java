package ba.fet.rwa.lv09;

final public class Blog {
	
	private String id;
	private String headline;
	private String text;
	
	public Blog(String id, String headline, String text) {
		this.id = id;
		this.headline = headline;
		this.text = text;
	}
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	public String getHeadline() {
		return headline;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public void setHeadline(String headline) {
		this.headline = headline;
	}
}
