import express from 'express';
import Book from '../models/book.mjs';
const router = express.Router();

router.get('/', async (req, res) => {
  // MongoDBのメソッドが使用出来る。「find()」で全件を取得する
  const books = await Book.find();
  res.json(books);
  // res.send('/api/books GET OK');
});

export default router;
