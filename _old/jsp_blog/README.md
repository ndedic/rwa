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
gradle generateBlogData
```
This will insert 10 random blog entries about software development topics into the database.

## Project Structure

- **Model**: JPA entities
- **Repository**: Database operations
- **Service**: Business logic
- **Servlet**: Web controllers
- **CLI**: Command-line tools