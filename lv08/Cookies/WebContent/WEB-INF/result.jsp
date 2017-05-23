<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ page import ="java.util.Map" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>


<%  Map<String, String> data = (Map<String,String>) request.getAttribute("data"); 
	for (Map.Entry<String, String> entry : data.entrySet()) {
	    String key = entry.getKey();
	    String value = entry.getValue();
	    %>
	    <%= value %>
	    <%
	    // ...
	}
	%>

</body>
</html>