<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<jsp:include page="/WEB-INF/views/header.jsp">
    <jsp:param name="title" value="Welcome"/>
</jsp:include>

<div class="row">
    <div class="col-md-12 text-center">
        <div class="py-5">
            <h1 class="display-4">Welcome to the Blog Application</h1>
            <p class="lead">A simple blog application built with Java Servlets and JSP</p>
            <hr class="my-4">
            <p>View all blog entries or create your own if you're logged in.</p>
            <div class="mt-4">
                <a href="${pageContext.request.contextPath}/blogs" class="btn btn-primary btn-lg me-2">View Blogs</a>
                <c:if test="${empty sessionScope.user}">
                    <a href="${pageContext.request.contextPath}/login" class="btn btn-outline-secondary btn-lg">Login</a>
                </c:if>
                <c:if test="${not empty sessionScope.user}">
                    <a href="${pageContext.request.contextPath}/create-blog" class="btn btn-outline-secondary btn-lg">Create Blog</a>
                </c:if>
            </div>
        </div>
    </div>
</div>

<jsp:include page="/WEB-INF/views/footer.jsp"/>
