## LV06 — CGI (RWA06)

### Objectives
- Understand how CGI (Common Gateway Interface) works — the original server-side web technology
- Compile C programs that produce HTTP responses (headers + body)
- Learn the difference between GET (`QUERY_STRING`) and POST (`stdin` + `CONTENT_LENGTH`)
- Deploy CGI programs to Apache Tomcat via its `CGIServlet`
- Call a CGI endpoint from JavaScript (AJAX → C program → JSON)

### Project Structure

```
lv06-cgi/
  cgi-source/              ← C source files (you edit and compile these)
    test.c                    "Hello!" — minimal CGI program
    env.c                     prints all environment variables + QUERY_STRING
    multiply.c                GET: reads m, n from QUERY_STRING, prints product
    square.c                  POST: reads num from stdin, prints square
    printval.c                POST: prints REQUEST_METHOD, QUERY_STRING, and post body
    calculator.c              GET: two numbers + operator, URL-decodes, calculates
    todo-api.c                GET: returns a hardcoded JSON array of todo items
  WEB-INF/
    web.xml                ← configures Tomcat's CGIServlet
    cgi/                   ← compiled binaries go here (Tomcat reads from this folder)
  META-INF/
    context.xml            ← sets privileged="true" (required for CGIServlet)
  multiply.html            ← HTML form → GET → cgi-bin/multiply
  square.html              ← HTML form → POST → cgi-bin/square
  calculator.html          ← HTML form → GET → cgi-bin/calculate
  cgi-client.html          ← AJAX (XHR) → cgi-bin/todo-api → renders JSON
```

### Prerequisites

- **C compiler:** `clang` (macOS) or `gcc` (Linux). Check with `clang --version` or `gcc --version`.
- **Apache Tomcat 9 or 10** (Tomcat 11 also works). Install instructions below.

#### Installing Tomcat

**macOS (Homebrew):**
```bash
brew install tomcat@10
```
After install, Tomcat lives at `/opt/homebrew/opt/tomcat@10/libexec/`. Set a shortcut:
```bash
export CATALINA_HOME=/opt/homebrew/opt/tomcat@10/libexec
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt install tomcat10
```
`CATALINA_HOME` is typically `/var/lib/tomcat10`.

**Manual install (any OS):**
1. Download from https://tomcat.apache.org/download-10.cgi (Core → zip or tar.gz)
2. Extract to a folder, e.g. `~/apache-tomcat-10.x.x`
3. Set the path:
   ```bash
   export CATALINA_HOME=~/apache-tomcat-10.1.40
   ```

Verify it works:
```bash
$CATALINA_HOME/bin/startup.sh
# Open http://localhost:8080 — you should see the Tomcat welcome page
$CATALINA_HOME/bin/shutdown.sh
```

### Step 1 — Compile the C Programs

From the `lv06-cgi/` directory:

```bash
# macOS (clang)
clang -o WEB-INF/cgi/test       cgi-source/test.c
clang -o WEB-INF/cgi/env        cgi-source/env.c
clang -o WEB-INF/cgi/multiply   cgi-source/multiply.c
clang -o WEB-INF/cgi/square     cgi-source/square.c
clang -o WEB-INF/cgi/printval   cgi-source/printval.c
clang -o WEB-INF/cgi/calculate  cgi-source/calculator.c   # see note below if this fails
clang -o WEB-INF/cgi/todo-api   cgi-source/todo-api.c

# If calculator.c fails to link on Apple Silicon / modern clang:
clang -Dinline="static inline" -o WEB-INF/cgi/calculate cgi-source/calculator.c

# Linux (gcc) — same commands, replace clang with gcc
gcc -o WEB-INF/cgi/test       cgi-source/test.c
gcc -o WEB-INF/cgi/multiply   cgi-source/multiply.c
# ... etc.
```

You can verify a program works standalone:

```bash
./WEB-INF/cgi/test
# Output:
# Content-type: text/html
#
# Hello!
```

### Step 2 — Deploy to Tomcat

Copy the entire `lv06-cgi/` folder into Tomcat's `webapps/` directory as `cgi`:

```bash
# Option A: copy the folder
cp -r lv06-cgi/ $CATALINA_HOME/webapps/cgi

# Option B: symlink (convenient during development — changes are instant)
ln -s "$(cd lv06-cgi && pwd)" $CATALINA_HOME/webapps/cgi
```

The folder name (`cgi`) becomes the URL path: `http://localhost:8080/cgi/...`

> **Important:** `$CATALINA_HOME` must point to your Tomcat installation (see Prerequisites above).

### Step 3 — Start Tomcat

```bash
$CATALINA_HOME/bin/startup.sh     # macOS / Linux
$CATALINA_HOME\bin\startup.bat    # Windows
```

You should see `Tomcat started.` in the terminal. If port 8080 is already in use (e.g. by Docker), either stop the other service or change Tomcat's port in `$CATALINA_HOME/conf/server.xml` (search for `port="8080"`).

Check the logs if something goes wrong:

```bash
tail -f $CATALINA_HOME/logs/catalina.out
```

To stop Tomcat:
```bash
$CATALINA_HOME/bin/shutdown.sh
```

### Step 4 — Open in Browser

| URL | What it does |
|-----|-------------|
| http://localhost:8080/cgi/multiply.html | Form → GET → multiply two numbers |
| http://localhost:8080/cgi/square.html | Form → POST → square a number |
| http://localhost:8080/cgi/calculator.html | Form → GET → basic calculator (+, −, /, ×) |
| http://localhost:8080/cgi/cgi-client.html | AJAX button → calls todo-api → renders JSON list |
| http://localhost:8080/cgi/cgi-bin/test | Direct CGI call → "Hello!" |
| http://localhost:8080/cgi/cgi-bin/env | Shows all CGI environment variables |
| http://localhost:8080/cgi/cgi-bin/env?foo=bar | Same, but now QUERY_STRING=foo=bar |

### How CGI Works

```
Browser                    Tomcat (CGIServlet)              C program
  │                              │                              │
  │── GET /cgi/cgi-bin/multiply?m=3&n=4 ──→│                   │
  │                              │── fork + exec ──────────────→│
  │                              │   sets env vars:             │
  │                              │     QUERY_STRING=m=3&n=4     │
  │                              │     REQUEST_METHOD=GET       │
  │                              │                              │
  │                              │←── stdout: ─────────────────│
  │                              │   Content-type: text/html    │
  │                              │   <html>...12.000000...</html>│
  │←── HTTP 200 ────────────────│                              │
```

**GET** parameters → `QUERY_STRING` environment variable.
**POST** body → piped to the program's `stdin`; length in `CONTENT_LENGTH`.

### Exercises

1. **test.c** — Read the code. It's the simplest possible CGI program: print a Content-type header, a blank line, then the body.
2. **env.c** — Hit `/cgi-bin/env?hello=world` and see all the environment variables Tomcat sets. Find `QUERY_STRING`, `REQUEST_METHOD`, `SERVER_NAME`.
3. **multiply.html → multiply.c** — Submit the form. Look at the URL bar — the parameters are in the query string. The C program parses them with `sscanf`.
4. **square.html → square.c** — Submit the form. This one uses POST. The C program reads `CONTENT_LENGTH`, then reads that many bytes from `stdin`.
5. **printval.c** — Hit it with both GET and POST (use the browser or `curl`). Compare what `REQUEST_METHOD`, `QUERY_STRING`, and the post body look like.
6. **calculator.html → calculator.c** — The `+` operator gets URL-encoded as `%2B`. The C program includes a URL decoder. Try all four operations.
7. **cgi-client.html → todo-api.c** — Click "Load Todos". The JavaScript makes an XHR request to a C program that returns JSON. Open DevTools → Network tab to see the raw response.

### Troubleshooting

| Problem | Fix |
|---------|-----|
| 404 on `/cgi-bin/*` | Check that `web.xml` has the CGIServlet mapping and the folder is in `webapps/` |
| 403 Forbidden | `context.xml` must have `privileged="true"` — CGIServlet requires it |
| 500 Internal Server Error | Check `catalina.out` logs. Usually means the binary isn't executable or doesn't exist in `WEB-INF/cgi/` |
| Binary not found | Make sure you compiled to `WEB-INF/cgi/<name>` (not `cgi-source/`) |
| "Permission denied" | Run `chmod +x WEB-INF/cgi/*` to make binaries executable |
| calculator.c won't link | On modern clang (arm64), `inline` doesn't emit a symbol. Compile with: `clang -Dinline=static\ inline -o WEB-INF/cgi/calculate cgi-source/calculator.c` |
| Blank page from calculator | The `+` sign in the query string — check that `calculator.c` URL-decodes it |

### Quick Test with curl

```bash
# GET — multiply
curl "http://localhost:8080/cgi/cgi-bin/multiply?m=6&n=7"

# POST — square
curl -X POST -d "num=9" http://localhost:8080/cgi/cgi-bin/square

# JSON API
curl http://localhost:8080/cgi/cgi-bin/todo-api
```

### Lecture Reference
RWA06 — CGI, QUERY_STRING, CONTENT_LENGTH, stdin, environment variables, Tomcat CGIServlet
