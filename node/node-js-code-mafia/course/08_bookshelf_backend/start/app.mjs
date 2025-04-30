import express from 'express';
import apiRoutes from './server/api-routes/index.mjs';
import dotenv from 'dotenv';
import './server/helpers/db.mjs';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// JSONを受け取るためのミドルウェア
app.use(express.json());

// API
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
