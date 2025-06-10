import * as http from 'http';

// リクエストパスに応じて処理を変える
const server = http.createServer(function (req, res) {
  if (req.url === '/hello') {
    res.end('Hello');
    return;
  }

  if (req.url === '/bye') {
    res.end('Bye');
    return;
  }

  console.log('Request URL is ', req.url);
});

server.listen(8080);
