import * as http from 'http';
import express from 'express';

const PORT = 8080;
const app = express();

app.get('/', function (req, res) {
  // app.sendの中にオブジェクトが渡された場合、
  // expressは自動的に、「JSON.stringify」を実行するため、
  // JSON形式でレスポンスが返却される。
  res.send({ message: 'hello', number: 1, array: ['banana', 'apple', 3] });
});

app.listen(PORT, function () {
  console.log(`Server start: http://localhost:${PORT}`);
});
