## LV08 — JSP (RWA08)

### Objectives
- Understand JSP (JavaServer Pages) as a view technology for servlets
- Use JSTL tags (`<c:forEach>`, `<c:if>`, `<c:choose>`) instead of scriptlets
- Implement the MVC pattern: Servlet (controller) → JSP (view)
- Use JPA/Hibernate for database persistence
- Forward requests from servlets to JSP views

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

The app auto-creates the database (`blogdb`) on first run. Update credentials in `src/main/resources/META-INF/persistence.xml`:

```xml
<property name="jakarta.persistence.jdbc.user" value="root"/>
<property name="jakarta.persistence.jdbc.password" value="YOUR_MYSQL_PASSWORD"/>
```

Replace `YOUR_MYSQL_PASSWORD` with your actual MySQL root password.

### How to Run

```bash
cd lv08-jsp

# 1. Make sure MySQL is running
brew services start mysql   # macOS
sudo systemctl start mysql  # Linux

# 2. Update your MySQL password in:
#    src/main/resources/META-INF/persistence.xml

# 3. Build the project
gradle build

# 4. Generate sample data (optional)
gradle generateBlogData

# 5. Run the web app
gradle appRun
```

Open http://localhost:8080/blog

### Project Structure

```
lv08-jsp/
  build.gradle                    ← Gradle + Gretty + Hibernate
  src/main/java/com/example/blog/
    model/BlogEntry.java             JPA entity
    repository/BlogRepository.java   database operations
    service/BlogService.java         business logic
    servlet/
      ListBlogEntriesServlet.java    GET /blogs → list-blogs.jsp
      ViewBlogEntryServlet.java      GET /blog/{id} → view-blog.jsp
      CreateBlogEntryServlet.java    GET/POST /create → create-blog.jsp
    listener/AppContextListener.java context lifecycle
    cli/BlogDataGenerator.java       generates sample data
    util/JPAUtil.java                EntityManager factory
  src/main/webapp/
    index.jsp                     ← redirects to /blogs
    css/styles.css
    WEB-INF/views/
      list-blogs.jsp              ← lists all entries with JSTL
      view-blog.jsp               ← single entry view
      create-blog.jsp             ← form to create new entry
```

### How MVC Works with Servlets + JSP

```
Browser                  Servlet (Controller)           JSP (View)
  │                           │                            │
  │── GET /blogs ────────────→│                            │
  │                           │── blogService.getAll() ───→│ (DB)
  │                           │←── List<BlogEntry> ───────│
  │                           │                            │
  │                           │── request.setAttribute()   │
  │                           │── forward to JSP ─────────→│
  │                           │                            │── renders HTML
  │←── HTTP 200 + HTML ──────│←───────────────────────────│
```

- Servlet handles logic, sets request attributes, forwards to JSP
- JSP only renders — no business logic in the view
- JSTL `<c:forEach>` iterates over collections set by the servlet

### Exercises

1. **ListBlogEntriesServlet + list-blogs.jsp** — Trace the flow: servlet loads data, sets attribute, forwards. JSP uses `<c:forEach>` to render.
2. **ViewBlogEntryServlet + view-blog.jsp** — URL pattern `/blog/*`, extracts ID from path.
3. **CreateBlogEntryServlet + create-blog.jsp** — GET shows form, POST saves entry and redirects.
4. **BlogEntry.java** — JPA entity with `@Entity`, `@Id`, `@GeneratedValue`. Hibernate auto-creates the table.
5. **BlogDataGenerator** — CLI tool that inserts sample data. Run with `gradle generateBlogData`.

### Assignment (15–20 min)

Add a "Delete" button to the blog view page:

1. Create `DeleteBlogEntryServlet` mapped to `/delete/*`
2. Extract the blog ID from the URL path
3. Delete the entry via `BlogService`
4. Redirect back to `/blogs`
5. Add a delete link/button in `view-blog.jsp`

### Troubleshooting

| Problem | Fix |
|---------|-----|
| `Communications link failure` | MySQL not running. Start with `brew services start mysql` or `sudo systemctl start mysql` |
| `Access denied for user 'root'` | Update credentials in `persistence.xml` |
| JSP changes not reflected | Restart `gradle appRun` |
| 404 on `/blog` | Context path is `/blog` — URL is `http://localhost:8080/blog/blogs` |
| JSTL tags not rendering | Check that JSTL dependencies are in build.gradle |

### Quick Test with curl

```bash
# List blogs
curl http://localhost:8080/blog/blogs

# View single blog (ID 1)
curl http://localhost:8080/blog/blog/1

# Create blog entry
curl -X POST -d "title=Test&content=Hello+World" http://localhost:8080/blog/create
```

### Lecture Reference
RWA08 — JSP, JSTL, MVC pattern, request forwarding, JPA/Hibernate basics
