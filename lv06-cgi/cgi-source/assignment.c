/*
 * Assignment: CGI Greeting Program
 *
 * Read GET parameters "name" and "age" from QUERY_STRING.
 * Output an HTML page that says:
 *   Hello, <name>! You are <age> years old.
 *   In 10 years you will be <age+10>.
 *
 * If parameters are missing or invalid, print an error message.
 *
 * Hints:
 *   - getenv("QUERY_STRING") gives you e.g. "name=Ana&age=21"
 *   - sscanf can parse it: sscanf(data, "name=%[^&]&age=%d", name, &age)
 *   - %[^&] reads a string up to the '&' character
 *
 * Compile: clang -o WEB-INF/cgi/assignment cgi-source/assignment.c
 * Test:    curl "http://localhost:8080/cgi/cgi-bin/assignment?name=Ana&age=21"
 */

#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    /* YOUR CODE HERE */

    return 0;
}
