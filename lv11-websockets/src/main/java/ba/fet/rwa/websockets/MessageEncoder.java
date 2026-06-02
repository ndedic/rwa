package ba.fet.rwa.websockets;

import jakarta.websocket.EncodeException;
import jakarta.websocket.Encoder;
import jakarta.websocket.EndpointConfig;

import com.google.gson.Gson;

/**
 * Encodes Message objects to JSON strings for WebSocket communication.
 */
public class MessageEncoder implements Encoder.Text<Message> {
    
    private static final Gson gson = new Gson();
 
    @Override
    public String encode(Message message) throws EncodeException {
        return gson.toJson(message);
    }
 
    @Override
    public void init(EndpointConfig endpointConfig) {
        // Custom initialization logic (not needed for this implementation)
    }
 
    @Override
    public void destroy() {
        // Resource cleanup (not needed for this implementation)
    }
}
