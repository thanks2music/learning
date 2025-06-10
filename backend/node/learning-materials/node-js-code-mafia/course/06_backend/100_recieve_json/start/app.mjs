import * as http from 'http';
import express from 'express';

const PORT = 8080;
const app = express();

app.use(express.json());
app.get('/', function (req, res) {
  res.send(`
    <form action="/result" method="POST">
      <input type="text" name="title">
      <input type="text" name="description">
      <input type="submit">
    </form>
    <script>
      // JavaScriptを使って、POSTのリクエストを送信する
      // まずは、フォームの要素を取得する
      const formEl = document.querySelector('form');
      // フォームが送信された時に、POSTリクエストを送信する
      // なお、submit時にイベントを渡す方法は複数あり、addEventListenerを使う方法と、onSubmitを使う方法がある
      formEl.onsubmit = function (event) {
        event.preventDefault(); // デフォルトのフォーム送信をキャンセル
        const title = formEl[0].value;
        const description = formEl[1].value;

        // 取得したタイトルとディスクリプションをdataオブジェクトに代入
        const data = {
          title,
          description
        }
        fetch('/result', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(async function(res) {
          const data = await res.json();
          console.log(data);
        }
      }
      // 以下は、addEventListenerを使った方法
      // form.addEventListener('submit', function (event) {
      //   event.preventDefault(); // デフォルトのフォーム送信をキャンセル
      //   const formData = new FormData(form);
      //   fetch('/result', {
      //     method: 'POST',
      //     body: formData,
      //   });
      // });
    </script>
    `);
});

app.post('/result', function (req, res) {
  const params = req.body;
  console.log(params);
  res.json({ msg: 'Success!' });
});

app.listen(PORT, function () {
  console.log(`Server start: http://localhost:${PORT}`);
});
