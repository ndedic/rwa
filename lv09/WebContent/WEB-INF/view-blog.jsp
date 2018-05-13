<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%@ page import="ba.fet.rwa.lv09.*" %>
	<%@ page import="java.util.*" %>
	<% List<Blog> blogList = (List<Blog>) request.getAttribute("data"); %>
	<% for (Blog blog : blogList) { %>

	<%= blog.getId() %>
	
	<br/>

	<%= blog.getHeadline() %>
	
	<br/>
	
	<%= blog.getText() %>

	<br/>

	<% } %>
</body>
</html>