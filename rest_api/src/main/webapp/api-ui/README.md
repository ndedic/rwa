# Blog API UI

A JavaScript-based UI for interacting with the Blog REST API.

## Features

- View a paginated list of blog posts
- View detailed information about a specific blog post
- Create new blog posts
- Edit existing blog posts
- Delete blog posts
- Responsive design

## Technical Details

The application is built using JavaScript:

- **api.js**: Service layer for interacting with the REST API
- **ui.js**: UI helper class for managing DOM interactions
- **app.js**: Main application controller
- **styles.css**: Modern CSS styling with variables and responsive design

## Usage

Access the UI at: http://localhost:8080/blog/api-ui/

## Architecture

The application follows a simple MVC-like pattern:

1. **Model**: The API service in `api.js` handles data fetching and manipulation
2. **View**: The UI class in `ui.js` manages DOM rendering and updates
3. **Controller**: The App class in `app.js` coordinates between the model and view

## Future Improvements

- Add user authentication
- Implement proper error handling
- Add rich text editing for blog content
- Implement client-side form validation
- Add search functionality
- Implement proper pagination with total count
