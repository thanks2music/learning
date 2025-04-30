import express from 'express';
import apiRoutes from '../06_backend/110_rest_api/start/api-routes/index.mjs';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// JSONを受け取るためのミドルウェア
app.use(express.json());

// API
app.use('/', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
