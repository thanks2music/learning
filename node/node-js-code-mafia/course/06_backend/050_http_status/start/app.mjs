import * as http from 'http';

const server = http.createServer(function (req, res) {
  console.log(req.url);
  // res.writeHead(200, {'content-type': 'text/html; charset=UTF-8'});
  res.writeHead(302, {v location: '/redirected' });
  if (req.url === '/hello') {
    res.end(`<h1>こんにちは</h1>`);
  } else if (req.url === '/bye') {
    res.end('bye');
  } else {
    res.end(req.url);
  }
});

server.listen(8080);
