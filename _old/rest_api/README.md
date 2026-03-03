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
Access the application at: http://localhost:8080/

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
- **REST API**: Jersey-based RESTful resources
- **API-UI**: JavaScript-based API interface

## REST API Interface

The application now includes a Jersey-based REST API that provides an alternative interface to the core services. This demonstrates how to integrate RESTful resources while reusing the same underlying business logic and data access layers.

### Accessing the REST API

- REST API Endpoints: http://localhost:8080/api/
- API-UI Interface: http://localhost:8080/api-ui/

The API-UI is a JavaScript-based application that provides an interactive interface for exploring and testing the REST API endpoints.

## Security Features

- Authentication using sessions and cookies
- Password hashing with BCrypt
- Input validation and sanitization
- Protected routes with AuthFilter
