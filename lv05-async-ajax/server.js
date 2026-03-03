const http = require('http');

const PORT = 3001;

const todos = [
    { id: 1, text: 'Learn async programming', checked: true },
    { id: 2, text: 'Understand Promises', checked: true },
    { id: 3, text: 'Master async/await', checked: false },
    { id: 4, text: 'Build AJAX todo app', checked: false }
];

const server = http.createServer((req, res) => {
    // CORS headers so HTML files served on a different port can fetch
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/api/todos') {
        res.writeHead(200);
        res.end(JSON.stringify(todos));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Todo API running at http://localhost:${PORT}/api/todos`);
});
