import * as http from 'http';

/**
 * リクエストメソッド
 *
 * GETメソッド: コンテンツの取得
 * 　　　タイミング：ブラウザのURL指定、リンクのクリック、<form>のデフォルト
 *      特徴：URLの一部にパラメータを渡す
 *
 * POSTメソッド: コンテンツの作成
 * 　　　 タイミング：<form>のPOSTメソッド
 *       特徴：リクエストの本文にパラメータを渡す
 */

const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'content-type': 'text/html; charset=UTF-8' });
  if (req.url === '/') {
    res.write(`<a href="/result?param1=1&param2=2">Get Method リンク</a>`);
    res.end(`
      <form action="/result" method="post">
        <input type="text" name="title">
        <input type="text" name="description">
        <input type="submit">
      </form>
    `);
  } else {
    console.log('req.url is', req.url);
    console.log('req.methos is', req.method);
    if (req.method === 'GET') {
      console.log('split is ', req.url.split('?'));
      // GETのパラメータを取得
      const queryString = req.url.split('?')[1]; // 指定した文字列で区切り、配列を返す

      const params = new URLSearchParams(queryString);
      console.log(params);
    } else if (req.method === 'POST') {
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });

      req.on('end', () => {
        const params = new URLSearchParams(data);
        console.log('end is', data);
        console.log(params);
      });
    }
    res.end(req.url);
  }
});

server.listen(8080);
