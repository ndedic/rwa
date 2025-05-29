# WebSockets Chat Application

A simple real-time chat application built using Java WebSockets and modern JavaScript.

## Overview

This project demonstrates a basic chat application using WebSockets for real-time communication between clients. The application consists of:

- A Java backend using Jakarta WebSocket API
- A modern JavaScript frontend with an object-oriented approach
- Gradle build system for dependency management and deployment

## Prerequisites

- JDK 21 or newer
- Gradle 8.0 or newer
- Web browser with WebSocket support

## Project Structure

```
websockets/
├── build.gradle        # Gradle build configuration
├── settings.gradle     # Gradle settings
├── src/
│   ├── main/
│   │   ├── java/       # Java source files
│   │   └── webapp/     # Web resources
│   └── test/           # Test files
└── README.md           # This file
```

## Building the Project

To build the project, run:

```bash
./gradlew build
```

This will compile the Java code, process resources, and create a WAR file in the `build/libs` directory.

## Running the Application

To run the application using the embedded Tomcat server:

```bash
./gradlew appRun
```

This will start the server on port 8080. You can access the application at:

```
http://localhost:8080/websockets/
```

## Features

- Real-time messaging between multiple clients
- User identification with custom usernames
- Modern responsive UI
- Clean separation of concerns between frontend and backend

## Implementation Details

### Backend

- Jakarta WebSocket API for handling WebSocket connections
- JSON message encoding/decoding using Gson
- Session management for connected clients

### Frontend

- Modern JavaScript with ES6+ features
- Object-oriented design pattern
- Responsive CSS layout

## License

This project is open source and available under the MIT License.
