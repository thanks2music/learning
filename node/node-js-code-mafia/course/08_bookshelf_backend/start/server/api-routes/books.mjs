import express from 'express';
import { body } from 'express-validator';
import { requestErrorHandler } from '../helpers/helper.mjs';
import {
  registBook,
  updateBook,
  getAllBooks,
  getBookById,
  deleteBook
} from '../controllers/books.mjs';
const router = express.Router();

// GETメソッド - 全件取得
router.get('/', requestErrorHandler(getAllBooks));

// GETメソッド - ID指定で取得
router.get('/:id', requestErrorHandler(getBookById));

// DELETEメソッド - ID指定で削除
router.delete('/:id', requestErrorHandler(deleteBook));

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
  requestErrorHandler(registBook)
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
  requestErrorHandler(updateBook)
);

export default router;
