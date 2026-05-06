## LV07 — Servlets, Cookies, Sessions (RWA07)

### Objectives
- Understand the Java Servlet lifecycle (init, service, destroy)
- Handle GET and POST requests with `doGet` / `doPost`
- Store and retrieve data using HTTP Cookies
- Manage server-side state with HTTP Sessions
- Return JSON from a servlet (simple REST-style endpoint)

### Prerequisites

- **JDK 23+** — check with `java -version`
- **Gradle** — check with `gradle --version`

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
lv07-servlets/
  build.gradle                 ← Gradle build with Gretty plugin (embedded Tomcat 10)
  settings.gradle
  src/main/java/com/example/
    HelloWorldServlet.java        basic doGet → HTML output
    HelloCookieServlet.java       cookie demo (incomplete — student exercise)
    HelloCookieFinalServlet.java  cookie demo (complete solution)
    HelloSessionServlet.java      session demo (incomplete — student exercise)
    HelloSessionFinalServlet.java session demo (complete solution)
    TodoApiServlet.java           GET → JSON array of todo items
  src/main/webapp/
    index.html                 ← landing page with links to all servlets
    WEB-INF/web.xml            ← deployment descriptor
```

### How to Run

```bash
cd lv07-servlets
gradle appRun
```

Open http://localhost:8080/ — you'll see the index page with links to all servlets.

To stop: press any key in the terminal.

### How Servlets Work

```
Browser                     Tomcat (Servlet Container)         Your Servlet
  │                                │                               │
  │── GET /hello ─────────────────→│                               │
  │                                │── calls doGet() ─────────────→│
  │                                │                               │
  │                                │←── response.getWriter() ─────│
  │                                │    writes HTML to output       │
  │←── HTTP 200 + HTML ───────────│                               │
```

- `@WebServlet("/hello")` maps a URL to a class
- Tomcat creates ONE instance, calls `doGet`/`doPost` for each request
- `HttpServletRequest` = what the browser sent (params, headers, cookies)
- `HttpServletResponse` = what you send back (status, headers, body)

### Exercises

1. **HelloWorldServlet** — Read the code. Simplest servlet: override `doGet`, write HTML to `response.getWriter()`.
2. **HelloCookieServlet** — The `doGet` shows a form. Implement `doPost`: read `name` and `colour` parameters, create `Cookie` objects, add them to the response. Then update `doGet` to check for existing cookies and display them.
3. **HelloSessionServlet** — Same pattern but with `HttpSession`. Implement `doPost`: store `name` and `colour` as session attributes. Update `doGet` to check session and display stored values.
4. **HelloCookieFinalServlet / HelloSessionFinalServlet** — Reference solutions. Compare your implementation.
5. **TodoApiServlet** — Returns JSON. Look at how `response.setContentType("application/json")` works and how Gson serializes objects.

### Assignment (15–20 min)

Create a new servlet `CounterServlet.java` mapped to `/counter` that:

1. Uses a **session** to track how many times the user has visited the page
2. On each GET request, increments the counter and displays: "You have visited this page N times."
3. Adds a link "Reset counter" that clears the session attribute

### Troubleshooting

| Problem | Fix |
|---------|-----|
| `gradle appRun` fails with plugin error | Ensure you have Gradle 9+ and Gretty 5.0.1 in build.gradle |
| Port 8080 already in use | Stop other services on 8080, or change `httpPort` in build.gradle |
| Changes not reflected | Stop and restart `gradle appRun` (no hot-reload by default) |
| 404 on servlet URL | Check `@WebServlet` annotation matches the URL you're hitting |

### Quick Test with curl

```bash
# Hello World
curl http://localhost:8080/hello

# Todo API (JSON)
curl http://localhost:8080/todo-api

# Cookie demo — submit form
curl -X POST -d "name=Ana&colour=blue" -c cookies.txt http://localhost:8080/HelloCookie
curl -b cookies.txt http://localhost:8080/HelloCookieFinal
```

### Lecture Reference
RWA07 — Servlets, lifecycle, doGet/doPost, Cookies, Sessions, @WebServlet annotation
