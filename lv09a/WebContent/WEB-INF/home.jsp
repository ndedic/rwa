<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<form action="${pageContext.request.contextPath}/HelloJsp" method="post">
    <p>Normal text field.        
    <input type="text" name="name" /></p>

    <p>Secret text field.        
    <input type="password" name="pass" /></p>

    <p>Single-selection radiobuttons.        
    <input type="radio" name="gender" value="M" /> Male
    <input type="radio" name="gender" value="F" /> Female</p>

    <p>Single-selection checkbox.
    <input type="checkbox" name="agree" /> Agree?</p>

    <p>Multi-selection checkboxes.
    <input type="checkbox" name="role" value="USER" /> User
    <input type="checkbox" name="role" value="ADMIN" /> Admin</p>

    <p>Single-selection dropdown.
    <select name="countryCode">
        <option value="NL">Netherlands</option>
        <option value="US">United States</option>
    </select></p>

    <p>Multi-selection listbox.
    <select name="animalId" multiple="true" size="2">
        <option value="1">Cat</option>
        <option value="2">Dog</option>
    </select></p>

    <p>Text area.
    <textarea name="message"></textarea></p>

    <p>Submit button.
    <input type="submit" name="submit" value="submit" /></p>
</form>

</body>
</html>