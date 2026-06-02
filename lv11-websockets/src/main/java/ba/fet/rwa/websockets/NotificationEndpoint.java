package ba.fet.rwa.websockets;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

/**
 * ASSIGNMENT: Implement a Notification endpoint.
 * 
 * Requirements:
 * 1. Create a WebSocket endpoint at "/notifications"
 * 2. When a client connects, send them a welcome message: "Connected to notifications"
 * 3. When a client sends a message, broadcast it prefixed with "[NOTIFICATION] " to ALL clients
 * 4. Use plain text (no encoder/decoder needed — just String messages)
 * 
 * Hints:
 * - Use session.getBasicRemote().sendText("...") to send text
 * - Keep a Set<Session> of connected clients (like ChatServer)
 * - Test by opening two browser tabs and sending from one
 */
@ServerEndpoint("/notifications")
public class NotificationEndpoint {

    // TODO: Create a static Set<Session> for connected clients
    
    // TODO: Implement @OnOpen — add session, send welcome message
    
    // TODO: Implement @OnMessage — broadcast to all clients with prefix
    
    // TODO: Implement @OnClose — remove session
    
}
