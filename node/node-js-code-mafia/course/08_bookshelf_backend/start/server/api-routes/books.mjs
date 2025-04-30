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
  const books = await Book.find({ _id: _id });
  // 「findById()」を使うと、IDを指定して取得することができる
  // const books = await Book.findById(_id);
  res.json(books);
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
  // const _id = req.params.id;
  // Mongooseの場合、ObjectIdを使わずに、直接IDを指定して取得することができる
  // const books = await Book.find({ _id: _id });
  // res.json(books);
});

export default router;
