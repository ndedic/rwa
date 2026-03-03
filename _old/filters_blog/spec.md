# Blog Application Enhancement Specification

By following the existing application architecture and conventions, implement the following enhancements:

## 1. User Management
- Create entity `User` with basic user detail fields:
  - firstname (String)
  - lastname (String)
  - username (String, unique constraint)
  - email (String)
  - password (String, store securely hashed)
  - created_at (LocalDateTime, auto-populated)
  - updated_at (LocalDateTime, auto-updated)

- Add `Role` as enum value with two fields:
  - ADMIN
  - EDITOR
  - Embed enum by value to user role field
- Update the BlogEntry entity to include a reference to the User who created it (ManyToOne relationship)

## 2. Authentication & Authorization
- Implement authentication using sessions, cookies and filters
- Add a new `AuthFilter` class using annotations to protect restricted resources
- Implement password hashing using BCrypt
- Implement proper session management with timeout handling

## 3. User Interface
- Add a new servlet `LoginServlet` for handling login requests
- Create a new JSP page `login.jsp` with the login form (username/password)
- Add a `LogoutServlet` to handle user logout and session invalidation
- Put existing JSP and servlet pages for creating blog posts behind login/authentication mechanism
- Add appropriate error messages for failed login attempts
- Modify the blog creation process to associate the current logged-in user with the new blog entry
- Update the blog view page to display the creator's information (first name, last name)

## 4. Data Generation & Testing
- Add a new CLI task which inserts 3 users into the database:
  - One ADMIN user
  - One EDITOR user
  - One random user
  - Store passwords securely hashed

## 5. Security Considerations
- Implement input validation for all user inputs
- Add protection against common web vulnerabilities (XSS, SQL Injection)
- Ensure secure session handling
