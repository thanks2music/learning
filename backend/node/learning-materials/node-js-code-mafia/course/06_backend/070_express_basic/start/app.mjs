import * as http from 'http';
import express from 'express';

// 慣例として「app」という変数にexpressのインスタンスを格納する事が多い
const app = express();
// 今回はポートを定数に定義する
const PORT = 8080;

// POSTの本文に乗ってきた値を取得するためには、
// express.urlencoded({ extended: true })を使う
// この関数は、expressのミドルウェアとして登録する
// この関数を使うと、POSTの本文を解析して、req.bodyに格納する
// 「extended: true」が、推奨される設定。デフォルトでもtrueだが、
// 今後のバージョンでデフォルトがfalseになるかもしれないので、
// 明示的にtrueを指定する事が推奨されている。
app.use(express.urlencoded({ extended: true }));

// GETメソッドで、httpリクエストがあった際の処理を記述出来る
app.get('/', (req, res) => {
  res.send(`
    <h1>Express Server</h1>
    <a href="/result?param1=1&param2=2">Get Method Link</a>
    <form action="/result" method="POST">
      <input type="text" name="title[]">
      <input type="text" name="title[]">
      <input type="text" name="description">
      <input type="submit">
    </form>
  `);
});
app.get('/result', (req, res) => {
  // httpパッケージでは、req.urlでリクエスト文字列を取得して、
  // const queryString = req.url.split('?')[1];
  // URLSearchParamsを使って、オブジェクトに返還するという処理をしていた
  // const params = new URLSearchParams(queryString);
  // では「Express」では、実際にどう書くのか？ 「req.query」で取得出来る。
  const params = req.query;
  console.log(params);
});

app.post('/result', (req, res) => {
  // Expressで、POSTメソッドの本文を取得するには、「req.body」を使う。
  const params = req.body;
  console.log(params);
});

// 第一引数にはポート、第二引数にはコールバック関数を渡す
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// const server = http.createServer(function (req, res) {
//   res.writeHead(200, { 'content-type': 'text/html; charset=UTF-8' });
//   console.log(req.url);
//   if (req.url === '/') {
//     res.write(`<a href="/result?param1=1&param2=2">Get Method Link</a>`);
//     res.end(`
//     <form action="/result" method="POST">
//       <input type="text" name="title">
//       <input type="text" name="description">
//       <input type="submit">
//     </form>
//     `);
//   } else {
//     console.log(req.url);
//     console.log(req.method);
//     if (req.method === 'GET') {
//       // GETのパラメータを取得
//       console.log(req.url.split('?'));
//       const queryString = req.url.split('?')[1];
//       const params = new URLSearchParams(queryString);
//       console.log(params.has('param1'));
//     } else if (req.method === 'POST') {
//       // POSTのパラメータを取得
//       let data = '';
//       req.on('data', function (chunk) {
//         data += chunk;
//       });
//       req.on('end', function () {
//         const params = new URLSearchParams(data);
//         console.log(params);
//       });
//     }
//     res.end(req.url);
//   }
// });

// server.listen(8080);
