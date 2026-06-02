## LV10 — REST API (RWA10)

### Objectives
- Understand RESTful web service architecture and HTTP verbs (GET, POST, PUT, DELETE)
- Implement a REST API using Jersey (JAX-RS) on top of an existing service layer
- Use DTOs (Data Transfer Objects) to control API response shape
- Build a JavaScript SPA that consumes the REST API using `fetch`
- Configure Jackson for JSON serialization of Java objects

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

Same as LV09. Update credentials in `src/main/resources/META-INF/persistence.xml`:

```xml
<property name="jakarta.persistence.jdbc.user" value="root"/>
<property name="jakarta.persistence.jdbc.password" value="password"/>
```

### Project Structure

```
lv10-rest-api/
  build.gradle
  src/main/java/com/example/blog/
    model/
      BlogEntry.java              JPA entity
      User.java                   user entity (password excluded from JSON via @JsonIgnore)
      Role.java                   enum: ADMIN, EDITOR
    repository/
      BlogRepository.java         JPA queries with pagination
      UserRepository.java
    service/
      BlogService.java            business logic layer
      UserService.java
    rest/
      config/
        BlogRestApplication.java  @ApplicationPath("/api") — registers Jersey
        JacksonConfig.java        configures Jackson for LocalDateTime
      resources/
        BlogResource.java         /api/blogs — GET, POST, PUT, DELETE
        UserResource.java         /api/users — GET (list, no passwords)
      dto/
        BlogEntryDTO.java         input DTO for create/update
        UserDTO.java              output DTO (no password field)
    filter/AuthFilter.java        protects servlet routes (not API)
    listener/AppContextListener.java
    servlet/                      traditional servlet UI (from LV09)
    cli/
      BlogDataGenerator.java      generates sample blogs
      UserDataGenerator.java      creates admin + editor users
    util/
      JPAUtil.java
      PasswordUtil.java
  src/main/webapp/
    api-ui/                       ← JavaScript SPA for the REST API
      index.html
      js/api.js                   fetch wrapper (BlogApiService class)
      js/ui.js                    DOM manipulation (BlogUI class)
      js/app.js                   controller (BlogApp class)
      css/styles.css
    WEB-INF/
      web.xml
      views/*.jsp                 traditional servlet views
```

### How to Run

```bash
cd lv10-rest-api

# 1. Set your MySQL credentials in src/main/resources/META-INF/persistence.xml
#    (update jakarta.persistence.jdbc.user and jakarta.persistence.jdbc.password)

# 2. Build
gradle build

# 3. Generate users (creates admin + editor)
gradle generateUserData

# 4. Generate sample blog data
gradle generateBlogData

# 5. Run the web app
gradle appRun
```

Open in browser:

- **REST API (JSON):** http://localhost:8080/blog/api/blogs
- **REST API UI (SPA):** http://localhost:8080/blog/api-ui/
- **Traditional servlet UI:** http://localhost:8080/blog/blogs

### How REST Works

```
Browser (SPA)              Jersey Runtime              BlogResource
  │                             │                          │
  │── GET /api/blogs ──────────→│                          │
  │                             │── route to @GET ────────→│
  │                             │                          │── blogService.getAllBlogs()
  │                             │                          │── return Response.ok(blogs)
  │←── 200 + JSON ────────────│←──────────────────────────│
  │                             │                          │
  │── POST /api/blogs ─────────→│                          │
  │   Content-Type: json        │── route to @POST ───────→│
  │   {"title":"...",           │                          │── validate DTO
  │    "content":"...",         │                          │── blogService.saveBlogEntry()
  │    "userId": 1}             │                          │── return 201 + created blog
  │←── 201 + JSON ────────────│←──────────────────────────│
```

- `@ApplicationPath("/api")` — all REST endpoints start with `/api`
- `@Path("/blogs")` on the resource class → full path is `/api/blogs`
- `@Produces(APPLICATION_JSON)` — Jersey + Jackson serialize Java → JSON
- `@Consumes(APPLICATION_JSON)` — Jersey + Jackson deserialize JSON → Java

### Exercises

1. **BlogRestApplication.java** — Look at how `@ApplicationPath` registers the Jersey servlet. No XML needed.
2. **BlogResource.java** — Read the full CRUD implementation. Note `@PathParam`, `@QueryParam`, `Response.status()`.
3. **UserResource.java** — See how UserDTO strips the password field before sending to client.
4. **JacksonConfig.java** — Understand why `JavaTimeModule` is needed for `LocalDateTime`.
5. **api-ui/js/api.js** — Trace how `fetch` calls map to the Java resource methods.

### Assignment (15–20 min)

Create a `CommentResource` at `/api/blogs/{blogId}/comments`:

1. Create `src/main/java/com/example/blog/rest/resources/CommentResource.java`
2. Implement `@GET` — return a hardcoded list of comments (no DB needed)
3. Implement `@POST` — accept a JSON body `{"author": "...", "text": "..."}`, return 201
4. Use `@PathParam("blogId")` to associate with a blog post

Stub file provided: `src/main/java/com/example/blog/rest/resources/CommentResource.java`

### Troubleshooting

| Problem | Fix |
|---------|-----|
| `Communications link failure` | MySQL not running |
| 404 on `/api/blogs` | Check that Jersey deps are in build.gradle, `BlogRestApplication` has `@ApplicationPath("/api")` |
| Empty JSON `{}` for dates | Missing `JacksonConfig` or `jackson-datatype-jsr310` dependency |
| CORS errors in browser | Only happens if API-UI served from different origin — not an issue with Gretty |
| No users in author dropdown | Run `gradle generateUserData` first |

### Quick Test with curl

```bash
# List all blogs
curl http://localhost:8080/blog/api/blogs

# Get single blog
curl http://localhost:8080/blog/api/blogs/1

# Create a blog
curl -X POST http://localhost:8080/blog/api/blogs \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Post","content":"Hello from curl","userId":1}'

# Update a blog
curl -X PUT http://localhost:8080/blog/api/blogs/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'

# Delete a blog
curl -X DELETE http://localhost:8080/blog/api/blogs/1

# List users
curl http://localhost:8080/blog/api/users
```

### Lecture Reference
RWA10 — REST architecture, JAX-RS (Jersey), JSON serialization, HTTP verbs, SPA with fetch API
