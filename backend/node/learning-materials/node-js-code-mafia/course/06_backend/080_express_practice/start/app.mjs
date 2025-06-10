import express from 'express';

const PORT = 8080;
const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <h1>練習問題</h1>
    <p>下記のフォームで送信したリクエストを「商品1、商品2がカートに追加されました。」のようなレスポンスとして返却する処理を記述しましょう</p>
    <form action="/cart" method="POST">
    <div>
      <label>商品：<input type="text" name="product[]"></label>
    </div>
    <div>
      <label>商品：<input type="text" name="product[]"></label>
    </div>
    <input type="submit">
    </form>
    `);
});

app.post('/cart', (req, res) => {
  // CodeMafiaさんの例
  const products = req.body.product;
  // 単純に配列の0と1を取得した場合
  // res.send(`${products[0]}、${products[1]}がカートに追加されました。`);
  // 上記をもう少しスマートに書いた場合
  res.send(`${products.join('、')}がカートに追加されました。`);
});

// 第一引数にはポート、第二引数にはコールバック関数を渡す
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
