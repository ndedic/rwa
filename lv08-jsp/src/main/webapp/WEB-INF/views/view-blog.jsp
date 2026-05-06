<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
    <title>${blogEntry.title}</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
</head>
<body>
    <div class="container">
        <h1>${blogEntry.title}</h1>
        <p class="blog-date">Posted on: ${blogEntry.createdAt}</p>
        
        <div class="blog-content">
            ${blogEntry.content}
        </div>
        
        <a href="${pageContext.request.contextPath}/blogs" class="back-btn">Back to Blog List</a>
    </div>
</body>
</html>