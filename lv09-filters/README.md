## LV09 — Filters (RWA09)

### Objectives
- Understand Servlet Filters and the filter chain
- Implement authentication using sessions and filters
- Protect routes with `@WebFilter` URL patterns
- Hash passwords with BCrypt (never store plaintext)
- Build login/logout flow with session management

### Prerequisites

- **JDK 23+** — `java -version`
- **Gradle** — `gradle --version`
- **MySQL Server** — `mysql --version`

#### Installing

**macOS (Homebrew):**
```bash
brew install openjdk gradle mysql
brew services start mysql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt install openjdk-21-jdk gradle mysql-server
sudo systemctl start mysql
```

### Database Setup

Same as LV08. Update credentials in `src/main/resources/META-INF/persistence.xml`:

```xml
<property name="jakarta.persistence.jdbc.user" value="root"/>
<property name="jakarta.persistence.jdbc.password" value="password"/>
```

### Project Structure

```
lv09-filters/
  build.gradle
  src/main/java/com/example/blog/
    model/
      BlogEntry.java              JPA entity (same as LV08)
      User.java                   user entity with hashed password
      Role.java                   enum: ADMIN, EDITOR
    repository/
      BlogRepository.java
      UserRepository.java         find user by username
    service/
      BlogService.java
      UserService.java            authenticate (BCrypt verify)
    servlet/
      ListBlogEntriesServlet.java public — no auth required
      ViewBlogEntryServlet.java   public
      CreateBlogEntryServlet.java protected by AuthFilter
      LoginServlet.java           GET → login form, POST → authenticate
      LogoutServlet.java          invalidates session
    filter/
      AuthFilter.java             checks session, redirects to /login
    listener/AppContextListener.java
    cli/
      BlogDataGenerator.java      generates blog entries
      UserDataGenerator.java      creates admin + editor users
    util/
      JPAUtil.java
      PasswordUtil.java           BCrypt hash + verify
  src/main/webapp/
    WEB-INF/views/
      list-blogs.jsp
      view-blog.jsp
      create-blog.jsp             only accessible when logged in
      login.jsp                   login form
      header.jsp                  shared header (shows login/logout)
      footer.jsp                  shared footer
    css/styles.css
    index.jsp
```

### How to Run

```bash
cd lv09-filters

# 1. Build
gradle build

# 2. Generate users (creates admin:admin123, editor:editor123)
gradle generateUserData

# 3. Generate sample blog data
gradle generateBlogData

# 4. Run the web app
gradle appRun
```

Open http://localhost:8080/blog

### How Filters Work

```
Browser                  AuthFilter                    Servlet
  │                          │                            │
  │── GET /create-blog ─────→│                            │
  │                          │── check session.user       │
  │                          │                            │
  │   [no user in session]   │                            │
  │←── 302 → /login ────────│                            │
  │                          │                            │
  │── POST /login ───────────────────────────────────────→│ LoginServlet
  │                          │                            │── verify BCrypt
  │                          │                            │── session.setAttribute("user")
  │←── 302 → /blogs ────────────────────────────────────│
  │                          │                            │
  │── GET /create-blog ─────→│                            │
  │                          │── session.user exists ✓    │
  │                          │── chain.doFilter() ───────→│ CreateBlogEntryServlet
  │←── 200 + HTML ──────────│←───────────────────────────│
```

- `@WebFilter(urlPatterns = {"/create-blog", "/admin/*"})` — protects these URLs
- Filter runs BEFORE the servlet — if not authenticated, redirects to login
- `chain.doFilter()` passes the request to the next filter or servlet

### Exercises

1. **AuthFilter.java** — Read the code. Understand `doFilter`, `FilterChain`, and how session check works.
2. **LoginServlet** — GET shows login.jsp, POST authenticates via `UserService.authenticate()`.
3. **LogoutServlet** — Calls `session.invalidate()` and redirects.
4. **UserService + PasswordUtil** — BCrypt hashing. Never compare passwords as strings.
5. **UserDataGenerator** — Creates test users with hashed passwords. Run with `gradle generateUserData`.

### Test Users

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | ADMIN |
| editor | editor123 | EDITOR |

### Assignment (15–20 min)

Add role-based access control:

1. Create `AdminFilter` mapped to `/admin/*`
2. Check that the logged-in user has `Role.ADMIN`
3. If not admin, redirect to `/blogs` with an error message
4. Create a simple `/admin/users` servlet that lists all users (admin-only page)

### Troubleshooting

| Problem | Fix |
|---------|-----|
| Login always fails | Run `gradle generateUserData` first to create users |
| `Communications link failure` | MySQL not running |
| Filter not triggering | Check `@WebFilter` URL pattern matches the request URL |
| Session lost after redirect | Make sure you're not creating a new session on every request |
| BCrypt error | Ensure `jbcrypt` dependency is in build.gradle |

### Quick Test with curl

```bash
# Public page — no auth needed
curl http://localhost:8080/blog/blogs

# Protected page — should redirect to login (302)
curl -v http://localhost:8080/blog/create-blog 2>&1 | grep "Location"

# Login
curl -X POST -d "username=admin&password=admin123" -c cookies.txt -L http://localhost:8080/blog/login

# Access protected page with session cookie
curl -b cookies.txt http://localhost:8080/blog/create-blog
```

### Lecture Reference
RWA09 — Servlet Filters, FilterChain, authentication, BCrypt, session-based security
