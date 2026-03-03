## LV01 — HTML + CSS (RWA02)

### Objectives
- Write a valid HTML5 document from scratch using semantic elements
- Apply CSS rules using different selector types
- Understand CSS specificity and the box model
- Use browser DevTools to inspect structure and styles

### How to Run
```bash
npm install   # first time only
npm start     # opens a local server
```
Open http://localhost:3000 in your browser.

### Exercises

1. **01-selectors.html** — Pre-built page with 11 CSS tasks. Each task asks you to write a specific CSS rule (element, class, ID, descendant, child, adjacent, pseudo-class, pseudo-element, box model, specificity). Open the file, read each task comment, write the rule, and verify in the browser.

### Assignment (15–20 min)

Open **00-assignment.html**. It contains instructions as an HTML comment. Build a complete page from scratch:

1. Valid HTML5 structure: `DOCTYPE`, `<html lang>`, `<head>` with charset and title, `<body>`
2. Link `style.css` in the head
3. Semantic structure: `<header>` with `<nav>` (3 links), `<main>` with two `<article>` elements (each with `<h2>` + `<p>`), `<footer>`
4. In `style.css`: class selector for articles (padding, margin, border), nav link hover style
5. Verify in DevTools → Elements tab

### Lecture Reference
RWA02 — HTML, CSS, selectors, specificity, box model
