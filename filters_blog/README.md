# Blog Application

A Java Servlets-based blog application using JPA/Hibernate with MySQL.

## Prerequisites

- JDK 23
- MySQL Server
- Gradle

## Database Configuration

Update the database credentials in `src/main/resources/META-INF/persistence.xml`:

```xml
<property name="jakarta.persistence.jdbc.user" value="YOUR_USERNAME"/>
<property name="jakarta.persistence.jdbc.password" value="YOUR_PASSWORD"/>
```

## Build and Run

### Clean the project
```bash
gradle clean
```

### Build the project
```bash
gradle build
```

### Run the web application
```bash
gradle appRun
```
Access the application at: http://localhost:8080/blog

### Generate sample data

```bash
gradle generateUserData
```
This will insert 2 users into the database: admin and editor

```bash
gradle generateBlogData
```
This will insert 10 random blog entries about software development topics into the database.

## Project Structure

- **Model**: JPA entities
- **Repository**: Database operations
- **Service**: Business logic
- **Servlet**: Web controllers
- **Filter**: Authentication and security filters
- **CLI**: Command-line tools

## Security Features

- Authentication using sessions and cookies
- Password hashing with BCrypt
- Input validation and sanitization
- Protected routes with AuthFilter