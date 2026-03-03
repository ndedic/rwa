```
 ██████╗  ██╗    ██╗  █████╗
 ██╔══██╗ ██║    ██║ ██╔══██╗
 ██████╔╝ ██║ █╗ ██║ ███████║
 ██╔══██╗ ██║███╗██║ ██╔══██║
 ██║  ██║ ╚███╔███╔╝ ██║  ██║
 ╚═╝  ╚═╝  ╚══╝╚══╝  ╚═╝  ╚═╝
```

# RI601 — Razvoj web aplikacija

Lab exercises for the Web Application Development course. 12 exercises that follow the lectures from HTML/CSS through to WebSockets.

## Exercises

| # | Folder | Topic | Lecture |
|---|--------|-------|---------|
| 01 | [lv01-html-css](lv01-html-css/) | HTML + CSS — semantic elements, selectors, specificity, box model | RWA02 |
| 02 | [lv02-js-basics](lv02-js-basics/) | JavaScript — types, arrays, functions, hoisting, scope, objects | RWA03 |
| 03 | [lv03-js-advanced](lv03-js-advanced/) | JavaScript — OOP, prototypes, inheritance, closures, ES6 classes | RWA04 |
| 04 | [lv04-dom](lv04-dom/) | DOM — traversal, createElement, events, capture/bubbling | RWA05 |
| 05 | [lv05-async-ajax](lv05-async-ajax/) | Async JS + AJAX — callbacks, promises, async/await, Fetch API | RWA03/05 |
| 06 | lv06-cgi | CGI — C programs, QUERY_STRING, HTML forms | RWA06 |
| 07 | lv07-servlets | Java Servlets — lifecycle, doGet/doPost, annotations | RWA07 |
| 08 | lv08-cookies-sessions | Cookies + Sessions — HTTP statelessness, persistence | RWA08 |
| 09 | lv09-jsp-blog | JSP — expressions, blog application, JPA | RWA09 |
| 10 | lv10-filters | Filters — servlet filters, authentication, RequestDispatcher | RWA10 |
| 11 | lv11-rest | MVC + REST API — Jersey, JSON, AJAX client | RWA11 |
| 12 | lv12-websockets | WebSockets — real-time chat, Java server endpoint | RWA12 |

## How to Use

Each exercise has its own `README.md` with instructions. The workflow is the same every week:

1. Open `README.md` — read what the exercise covers
2. Run the project (`npm start` or `gradle appRun`)
3. Work through the exercise files
4. Do the assignment (15–20 min)

## Prerequisites

- **LV01–LV05:** [Node.js](https://nodejs.org/) (v18+)
- **LV06:** C compiler (`gcc`), Apache Tomcat
- **LV07–LV12:** JDK 17+, [Gradle](https://gradle.org/)

## Structure

```
rwa/
  lv01-html-css/          ← HTML/CSS/JS exercises (npm)
  ...
  lv06-cgi/               ← C/CGI exercise (Makefile)
  lv07-servlets/          ← Java exercises (Gradle) — each includes
  ...                       everything from previous Java exercises
  lv12-websockets/
  _old/                   ← archived old exercises (for reference)
```
