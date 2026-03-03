package ba.fet.rwa.lv12;

public class Message {
	private String userId;
	private String username;
	private String text;
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	@Override
	public String toString() {
		return "Message [userId=" + userId + ", username=" + username + ", text=" + text + "]";
	}
}
