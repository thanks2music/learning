// Node.jsの標準パッケージ
import * as http from 'http';

const server = http.createServer(function (req, res) {
  console.log(req.url);
  res.end('Hello Node.js');
  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  // res.end('Hello World\n');
});

server.listen(8080);
