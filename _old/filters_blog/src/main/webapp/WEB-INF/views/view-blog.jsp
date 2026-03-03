<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<jsp:include page="header.jsp">
    <jsp:param name="title" value="${blogEntry.title}"/>
</jsp:include>

<div class="row">
    <div class="col-md-12">
        <div class="mb-4">
            <a href="${pageContext.request.contextPath}/blogs" class="btn btn-outline-secondary">
                <i class="bi bi-arrow-left"></i> Back to Blog List
            </a>
        </div>
        
        <div class="card shadow">
            <div class="card-body">
                <h1 class="card-title">${blogEntry.title}</h1>
                <p class="text-muted">
                    Posted on: ${blogEntry.createdAt}
                    <c:if test="${blogEntry.createdBy != null}">
                        | Created by: ${blogEntry.createdBy.firstname} ${blogEntry.createdBy.lastname}
                    </c:if>
                </p>
                
                <hr>
                
                <div class="card-text">
                    ${blogEntry.content}
                </div>
            </div>
        </div>
    </div>
</div>

<jsp:include page="footer.jsp"/>
