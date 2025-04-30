import * as http from 'http';

const server = http.createServer(function (req, res) {
  console.log(req.url);
  // 参考例: text/html; charset=UTF-8
  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  if (req.url === '/hello') {
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Content-Typeを学ぶ</title>
</head>
<body>
<h1>こんにちは</h1>
</body>
</html>`);
  } else if (req.url === '/bye') {
    res.end('bye');
  }
});

server.listen(8080);
