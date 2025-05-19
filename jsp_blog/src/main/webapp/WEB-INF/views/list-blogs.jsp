<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Blog Entries</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
</head>
<body>
    <div class="container">
        <h1>Blog Entries</h1>
        
        <a href="${pageContext.request.contextPath}/create" class="create-btn">Create New Blog Entry</a>
        
        <c:if test="${empty blogEntries}">
            <p>No blog entries found.</p>
        </c:if>
        
        <c:forEach items="${blogEntries}" var="entry">
            <div class="blog-entry">
                <h2 class="blog-title">${entry.title}</h2>
                <p class="blog-date">Posted on: ${entry.createdAt}</p>
                <div class="blog-content">
                    <c:choose>
                        <c:when test="${entry.content.length() > 200}">
                            ${entry.content.substring(0, 200)}...
                        </c:when>
                        <c:otherwise>
                            ${entry.content}
                        </c:otherwise>
                    </c:choose>
                </div>
                <p><a href="${pageContext.request.contextPath}/blog/${entry.id}" class="read-more">Read more</a></p>
            </div>
        </c:forEach>
    </div>
</body>
</html>