var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(getItems()));
}).listen(3000);

function getItems() {
  return [
    { text: 'Todo item 1', checked: false  },
    { text: 'Todo item 2', checked: true  },
    { text: 'Todo item 3', checked: true  }
  ];
}
