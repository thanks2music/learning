// Common.jsでモジュールを取得するには「.require()」を使う
// ファイルをインポートする際のパスは、ファイルからの相対パスとなる他、拡張子を省略することができる
const calc = require('./calc');
const { plus, minus } = require('./calc');
const result = calc.plus(1, 2);
const result2 = plus(6, 4);
const result3 = minus(10, 5);
console.log(result);
console.log(result2);
console.log(result3);
