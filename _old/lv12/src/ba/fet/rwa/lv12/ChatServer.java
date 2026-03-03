package ba.fet.rwa.lv12;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(
		value = "/chat",
		decoders = MessageDecoder.class, 
		encoders = MessageEncoder.class )
public class ChatServer {

	private final static Set<Session> sessions =  new CopyOnWriteArraySet<Session>();
	
	@OnOpen
    public void onOpen(
      Session session) throws IOException {
        sessions.add(session);
        System.out.println("Added new session: " + session.getId());
    }
	
	@OnMessage
	public Message handleTextMessage(Message message) {
		System.out.println("New Text Message Received");
		System.out.println(message);
		sessions.forEach(s -> {
			try {				
				System.out.println("sending message to:" + s.getId());
				s.getBasicRemote().sendObject(message);
			} catch (IOException | EncodeException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		});
		return message;
	}
	
	@OnClose	
    public void onClose(Session session) throws IOException {		
		sessions.remove(session);
		System.out.println("Session removed: " + session.getId());
    }
}