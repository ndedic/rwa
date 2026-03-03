package ba.fet.rwa.websockets;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.logging.Level;
import java.util.logging.Logger;

import jakarta.websocket.EncodeException;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

/**
 * WebSocket endpoint for chat functionality.
 */
@ServerEndpoint(
        value = "/chat",
        decoders = MessageDecoder.class, 
        encoders = MessageEncoder.class)
public class ChatServer {

    private static final Logger LOGGER = Logger.getLogger(ChatServer.class.getName());
    private static final Set<Session> sessions = new CopyOnWriteArraySet<>();
    
    /**
     * Handles new WebSocket connections.
     * 
     * @param session The WebSocket session
     */
    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
        LOGGER.info("Added new session: " + session.getId());
    }
    
    /**
     * Handles incoming messages and broadcasts them to all connected clients.
     * 
     * @param message The received message
     * @return The same message (for potential chaining)
     */
    @OnMessage
    public Message handleTextMessage(Message message) {
        LOGGER.info("New message received: " + message);
        
        sessions.forEach(session -> {
            try {
                LOGGER.fine("Sending message to: " + session.getId());
                session.getBasicRemote().sendObject(message);
            } catch (IOException | EncodeException e) {
                LOGGER.log(Level.SEVERE, "Error sending message", e);
            }
        });
        
        return message;
    }
    
    /**
     * Handles WebSocket connection closures.
     * 
     * @param session The WebSocket session being closed
     */
    @OnClose    
    public void onClose(Session session) {
        sessions.remove(session);
        LOGGER.info("Session removed: " + session.getId());
    }
}
