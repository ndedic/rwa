## LV11 — WebSockets (RWA11)

### Objectives
- Understand the WebSocket protocol and how it differs from HTTP
- Implement a server endpoint using Jakarta WebSocket API (`@ServerEndpoint`)
- Use encoders/decoders to serialize Java objects to/from JSON
- Build a real-time chat client in JavaScript using the `WebSocket` API
- Understand broadcast messaging (one-to-many)

### Prerequisites

- **JDK 23+** — `java -version`
- **Gradle** — `gradle --version`

#### Installing

**macOS (Homebrew):**
```bash
brew install openjdk gradle
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt install openjdk-21-jdk gradle
```

### Project Structure

```
lv11-websockets/
  build.gradle
  src/main/java/ba/fet/rwa/websockets/
    ChatServer.java             @ServerEndpoint("/chat") — broadcasts messages
    Message.java                POJO: userId, username, text
    MessageEncoder.java         Message → JSON (Gson)
    MessageDecoder.java         JSON → Message (Gson)
    NotificationEndpoint.java   ← ASSIGNMENT stub
  src/main/webapp/
    index.html                  chat UI
    js/chat.js                  WebSocket client (ChatApplication class)
    css/chat.css                styling
    WEB-INF/web.xml
```

### How to Run

```bash
cd lv11-websockets

# 1. Build
gradle build

# 2. Run
gradle appRun
```

Open http://localhost:8080/websockets/ — enter a username when prompted.

Open a **second browser tab** at the same URL with a different username to test real-time messaging.

### How WebSockets Work

```
Browser A                    Tomcat (ChatServer)              Browser B
  │                               │                              │
  │── ws://host/websockets/chat ─→│                              │
  │   (HTTP Upgrade → WebSocket)  │                              │
  │←─ 101 Switching Protocols ───│                              │
  │                               │←─ ws://host/websockets/chat ─│
  │                               │─→ 101 Switching Protocols ──→│
  │                               │                              │
  │── {"username":"A",           │                              │
  │    "text":"Hello"} ─────────→│                              │
  │                               │── broadcast to ALL ─────────→│
  │←─ {"username":"A",           │   {"username":"A",           │
  │    "text":"Hello"} ──────────│    "text":"Hello"}           │
  │                               │                              │
```

- **HTTP** = request/response (client always initiates)
- **WebSocket** = full-duplex (both sides can send at any time)
- Connection stays open — no polling needed
- `@OnOpen`, `@OnMessage`, `@OnClose` — lifecycle callbacks

### Exercises

1. **ChatServer.java** — Read the broadcast logic. Note `CopyOnWriteArraySet` for thread safety.
2. **Message.java** — Simple POJO. Gson serializes all fields automatically.
3. **MessageEncoder/Decoder** — Understand `Encoder.Text<Message>` and `Decoder.Text<Message>`.
4. **chat.js** — Trace `new WebSocket(url)`, `onmessage`, `client.send(JSON.stringify(...))`.
5. **index.html** — Note how the UI displays own messages vs. others differently.

### Assignment (15–20 min)

Implement `NotificationEndpoint.java`:

1. WebSocket endpoint at `/notifications`
2. On connect: send "Connected to notifications" to the new client
3. On message: broadcast the text prefixed with `[NOTIFICATION] ` to ALL connected clients
4. Plain text only (no encoder/decoder needed)

Test by opening the browser console:
```javascript
const ws = new WebSocket('ws://localhost:8080/websockets/notifications');
ws.onmessage = (e) => console.log(e.data);
ws.onopen = () => ws.send('Server restarted');
```

### Troubleshooting

| Problem | Fix |
|---------|-----|
| 404 on WebSocket connect | Check `contextPath` in build.gradle matches the URL path |
| "WebSocket is already in CLOSING or CLOSED state" | Server crashed or port conflict — restart with `gradle appRun` |
| Messages not appearing for other users | Check `sessions.forEach` broadcasts to ALL sessions, not just sender |
| `ClassNotFoundException: jakarta.websocket` | Ensure `jakarta.websocket-api` is in `compileOnly` dependencies |
| Gson serialization error | Check Message.java has matching field names to JSON |

### Quick Test with curl

WebSockets can't be tested with regular curl, but you can verify the HTTP upgrade:

```bash
# Should return 404 (not an HTTP endpoint) or attempt upgrade
curl -v http://localhost:8080/websockets/chat 2>&1 | grep "Upgrade"

# Verify the app is running
curl http://localhost:8080/websockets/
```

For real testing, use the browser or `websocat`:
```bash
# Install websocat: brew install websocat
websocat ws://localhost:8080/websockets/chat
# Type JSON: {"username":"CLI","userId":"cli-1","text":"Hello from terminal"}
```

### Lecture Reference
RWA11 — WebSocket protocol, full-duplex communication, Jakarta WebSocket API, @ServerEndpoint, Encoder/Decoder, real-time web applications
