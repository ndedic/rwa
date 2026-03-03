package ba.fet.rwa.websockets;

import jakarta.websocket.DecodeException;
import jakarta.websocket.Decoder;
import jakarta.websocket.EndpointConfig;

import com.google.gson.Gson;

/**
 * Decodes JSON strings to Message objects for WebSocket communication.
 */
public class MessageDecoder implements Decoder.Text<Message> {
    
    private static final Gson gson = new Gson();
 
    @Override
    public Message decode(String s) throws DecodeException {
        return gson.fromJson(s, Message.class);
    }
 
    @Override
    public boolean willDecode(String s) {
        return s != null;
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
