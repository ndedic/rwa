## LV04 — DOM (RWA05)

### Objectives
- Understand the DOM tree: nodes vs elements, traversal properties
- Create, modify, and remove DOM elements with JavaScript
- Attach event handlers three ways: inline, DOM property, addEventListener
- Understand event propagation: capture → target → bubble

### How to Run
```bash
npm install   # first time only
npm start     # serves on http://localhost:3000
```
Open files in browser: `00-assignment.html`, `01-dom-basics.html`, `02-events.html`, `todo/index.html`.

### Exercises

1. **01-dom-basics.html** — childNodes vs children, tree navigation (parentNode, siblings), createElement + appendChild.
2. **02-events.html** — Three handler styles (inline, DOM property, addEventListener). Capture/bubble phases with live log. stopPropagation demo.
3. **todo/** — Complete todo app: add, delete, check/uncheck, filter (all/active/completed).
4. **todo/oop/** — Same todo app refactored to OOP with reusable constructor (two instances on one page).

### Assignment (15–20 min)

Open **00-assignment.html**. A `<ul>` with 5 `<li>` items is provided. In the `<script>` tag, write JS to:

1. Log `childNodes.length` vs `children.length` of the `<ul>` — explain why they differ
2. Change the third `<li>` text to "Modified by JavaScript" using `children[2].textContent`
3. Create a new `<li>` with text "Added by JavaScript" using `createElement` + `appendChild`

Verify in browser: third item changed, sixth item added, console shows node counts.

### Lecture Reference
RWA05 — DOM tree, node types, traversal, createElement, events, capture/bubbling
