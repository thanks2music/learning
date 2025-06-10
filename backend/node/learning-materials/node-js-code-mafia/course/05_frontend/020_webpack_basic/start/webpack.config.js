const path = require('path');

module.exports = {
  // 本番用か開発用かをmodeで指定
  mode: 'development',
  // エントリーポイントのJavaScriptを指定
  entry: './main.js',
  // アウトプット用のパスとファイル名を指定
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  }
};
