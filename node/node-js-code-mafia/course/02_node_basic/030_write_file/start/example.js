// ファイルへの書き込み
// __dirname, __filename
const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, '../dist/test3.txt');
const distPath2 = path.resolve(__dirname, '..', 'dist', 'test4.txt');
const distPath3 = path.join(__dirname, '../dist/test3.txt');
console.log(distPath3);

// 相対パスは、node.jsを実行するディレクトリからの相対パス
// fs.writeFileSync(distPath, 'Hello, node.js');
// fs.writeFileSync(distPath2, 'Hello, node.js');
// console.log('hello, node.js');
