import express from 'express';
import { body } from 'express-validator';
import Book from '../models/book.mjs';
import {
  registBook,
  updateBook,
  getAllBooks,
  getBookById,
  deleteBook
} from '../controllers/books.mjs';
const router = express.Router();

router.get('/', getAllBooks);

router.get('/:id', getBookById);

// Deleteメソッド
router.delete('/:id', deleteBook);

// POSTメソッド - まずバリデーションを処理する
// 「experss-validator」は、内部で「validator.js」を使用している
// @use validator.js https://github.com/validatorjs/validator.js
router.post(
  '/',
  body('title').notEmpty().withMessage('タイトルは必須です'),
  body('description').notEmpty().withMessage('説明文は必須です'),
  body('comment').notEmpty().withMessage('コメントは必須です'),
  body('rating')
    .notEmpty()
    .isInt({ min: 1, max: 5 })
    .withMessage('評価は1から5の整数で指定してください'),
  registBook
);

// PATCHメソッド (更新)
// メソッドは、Validator.jsのもの https://github.com/validatorjs/validator.js
router.patch(
  '/:id',
  body('title').optional().notEmpty().withMessage('タイトルは必須です'),
  body('description').optional().notEmpty().withMessage('説明文は必須です'),
  body('comment').optional().notEmpty().withMessage('コメントは必須です'),
  body('rating')
    .optional()
    .notEmpty()
    .isInt({ min: 1, max: 5 })
    .withMessage('評価は1から5の整数で指定してください'),
  updateBook
);

export default router;
