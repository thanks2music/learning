import express from 'express';
import booksRouter from './books.mjs';

// ルーターを作成
const router = express.Router();
// booksRouterを/api/booksにマウント
router.use('/books', booksRouter);
// routerをエクスポート
export default router;
