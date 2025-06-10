import express from 'express';
import apiRoutes from '../06_backend/110_rest_api/start/api-routes/index.mjs';
import { requestErrorHandler } from './helpers/helper.mjs';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// JSONを受け取るためのミドルウェア
app.use(express.json());

// API
app.use('/', apiRoutes);

// エラーハンドリング
app.user(function (req, res) {
  res.status(404).json({ msg: 'リクエストされたURLは存在しません。' });
});

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ msg: '不正なエラーが発生しました。' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
