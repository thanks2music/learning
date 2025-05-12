import express from 'express';
import apiRoutes from './api-routes/index.mjs';
import dotenv from 'dotenv';
import './helpers/db.mjs';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// JSONを受け取るためのミドルウェア
app.use(express.json());

// API
app.use('/api', apiRoutes);

// 想定されるパス以外にアクセスがあった際の処理
app.use((req, res) => {
  res.status(404).json({ msg: 'Page Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
