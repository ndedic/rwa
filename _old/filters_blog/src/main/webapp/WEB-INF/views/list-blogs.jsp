<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<c:set var="pageTitle" value="Blog Entries" scope="request"/>
<jsp:include page="header.jsp">
    <jsp:param name="title" value="${pageTitle}"/>
</jsp:include>

<div class="row">
    <div class="col-md-12">
        <h1 class="mb-4">Blog Entries</h1>
        
        <c:if test="${not empty sessionScope.user}">
            <div class="mb-4">
                <a href="${pageContext.request.contextPath}/create-blog" class="btn btn-primary">Create New Blog Entry</a>
            </div>
        </c:if>
        
        <c:if test="${empty blogEntries}">
            <div class="alert alert-info">No blog entries found.</div>
        </c:if>
        
        <c:forEach items="${blogEntries}" var="entry">
            <div class="card mb-4 shadow-sm">
                <div class="card-body">
                    <h2 class="card-title">${entry.title}</h2>
                    <p class="text-muted small">
                        Posted on: ${entry.createdAt}
                        <c:if test="${entry.createdBy != null}">
                            | By: ${entry.createdBy.firstname} ${entry.createdBy.lastname}
                        </c:if>
                    </p>
                    <div class="card-text mb-3">
                        <c:choose>
                            <c:when test="${entry.content.length() > 200}">
                                ${entry.content.substring(0, 200)}...
                            </c:when>
                            <c:otherwise>
                                ${entry.content}
                            </c:otherwise>
                        </c:choose>
                    </div>
                    <a href="${pageContext.request.contextPath}/blog/${entry.id}" class="btn btn-sm btn-outline-primary">Read more</a>
                </div>
            </div>
        </c:forEach>
    </div>
</div>

<jsp:include page="footer.jsp"/>
