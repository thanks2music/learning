import express from 'express';
import Book from '../models/book.mjs';
const router = express.Router();

router.get('/', async (req, res) => {
  // MongoDBのメソッドが使用出来る。「find()」で全件を取得する
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
  // res.send('/api/books GET OK');
});
router.get('/:id', async (req, res) => {
  const _id = req.params.id;
  // Mongooseの場合、ObjectIdを使わずに、直接IDを指定して取得することができる
  const book = await Book.find({ _id: _id });
  // 「findById()」を使うと、IDを指定して取得することができる
  // const books = await Book.findById(_id);
  res.json(book);
});

// Deleteメソッド
router.delete('/:id', async (req, res) => {
  const _id = req.params.id;
  // Mongooseの場合、ObjectIdを使わずに、直接IDを指定して取得することができる
  await Book.deleteOne({ _id: _id });
  res.json({ msg: 'Delete Succeeded' });
});

// POSTメソッド
router.post('/', async (req, res) => {
  const book = new Book(req.body);
  const newBook = await book.save();
  res.json(newBook);
});

// PATCHメソッド (更新/
router.patch('/:id', async (req, res) => {
  const { title, description, comment, rating } = req.body;
  const _id = req.params.id;
  const book = await Book.findById(_id);
  // データが全て揃って届くとは限らないため、歯抜けで情報が飛んできても、
  // 届いた情報のみを更新出来るように、サーバー側は準備しておく方が良い。
  // if (title !== undefined) {
  //   book.title = title;
  // }
  // 上記のように条件式の中の処理が、1行だけなら以下のように省略する事が出来る
  if (title !== undefined) book.title = title;
  if (description !== undefined) book.description = description;
  if (comment !== undefined) book.comment = comment;
  if (rating !== undefined) book.rating = rating;
  await book.save();
  res.json(book);
});

export default router;
