import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Book from '../models/book.mjs';

async function getAllBooks(req, res) {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
}

async function getBookById(req, res) {
  const _id = req.params.id;
  // Mongooseの場合、ObjectIdを使わずに、直接IDを指定して取得することができる
  const book = await Book.find({ _id: _id });
  // 「findById()」を使うと、IDを指定して取得することができる
  // const books = await Book.findById(_id);

  // エラーや例外の時は、エラーとして返す
  // return を使うことで、「res.status(404)」を返した後、処理を中断することができる
  // そのため、res.json(book)までは実行されない
  if (book === null) return res.status(404).json({ msg: 'Page Not Found' });
  res.json(book);
}

async function deleteBook(req, res) {
  // Mongooseの場合、ObjectIdを使わずに、直接IDを指定して取得することができる
  const { id } = req.params;

  // ObjectIdの妥当性をチェック
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: '無効なIDが指定されました' });
  }

  // リファクタのために、一度変数に入れて、console.logで内容を確認する
  // const result = await Book.deleteOne({ _id: _id });
  // 確認したところ「deletedCount」という値が返す事が分かったので、分割代入で、「deletedCount」だけを取得する
  const { deletedCount } = await Book.deleteOne({ id });
  if (deletedCount === 0)
    return res.status(404).json({ msg: 'Target Book Not Found' });
  res.json({ msg: 'Delete Succeeded' });
}

async function registBook(req, res) {
  // エラーチェック
  const errors = validationResult(req);

  // エラーがあった場合、エラー内容と400を返す
  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const book = new Book(req.body);
  const newBook = await book.save();
  res.status(201).json(newBook);
}

async function updateBook(req, res) {
  const errors = validationResult(req);

  // エラーがあった場合
  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const { title, description, comment, rating } = req.body;
  const _id = req.params.id;
  const book = await Book.findById(_id);
  // bookがnullの場合、エラーを返す
  if (book === null) return res.status(404).json({ msg: 'Page Not Found' });
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
}

export { registBook, updateBook, getAllBooks, getBookById, deleteBook };
