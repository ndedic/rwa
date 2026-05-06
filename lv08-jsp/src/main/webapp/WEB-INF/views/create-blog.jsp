<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Create Blog Entry</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
</head>
<body>
    <div class="container">
        <h1>Create Blog Entry</h1>
        
        <c:if test="${not empty error}">
            <div class="error">${error}</div>
        </c:if>
        
        <form action="${pageContext.request.contextPath}/create" method="post">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" name="title" value="${title}" required>
            </div>
            
            <div class="form-group">
                <label for="content">Content</label>
                <textarea id="content" name="content" required>${content}</textarea>
            </div>
            
            <button type="submit" class="btn">Create Blog Entry</button>
            <a href="${pageContext.request.contextPath}/blogs" class="btn btn-cancel">Cancel</a>
        </form>
    </div>
</body>
</html>