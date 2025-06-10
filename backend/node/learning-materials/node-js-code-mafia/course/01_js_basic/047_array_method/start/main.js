// Mapメソッドの使い方
const arry = [10, 20, 30, 40];
const newArry = [];

for (let i = 0; i < arry.length; i++) {
  newArry.push(arry[i] * 2);
}

console.log(newArry);

const newArry2 = arry.map(val => val * 2);

console.log(newArry2);

const newArry2_onaji = arry.map(val => {
  return val * 2;
});

const newArry2_onaji_kuwasiiban = arry.map((val, i, arry) => {
  console.log(val, i);
  return val * 2;
});

console.log(newArry2_onaji);

// Filterメソッドの使い方

// まずはfor文で、50より大きい場合のみ2倍にする
const newArry50over = [];
for (let i = 0; i < arry.length; i++) {
  const val = arry[i] * 2;
  if (val > 50) {
    newArry50over.push(arry[i] * 2);
  }
}

console.log(newArry50over);

const newArry2_onaji_filter = arry.map(val => {
  return val * 2;
});

// filterメソッドの場合も、valに元の配列が渡ってくる。
// またfilterメソッドでは、コールバック関数がreturnする値が、trueの場合のみ新しい要素として配列に追加される。
// つまりreturnする値が、falseの場合は追加されない。
const newArry3 = newArry2_onaji_filter.filter(val => val > 50);
console.log(newArry3);

// mapを使った後、filterメソッドを使いたい場合
// 以下のように「.」で繋げて、1行で書くことも出来る。
const newArry4 = arry.map(val => val * 2).filter(val => val > 50);
console.log(newArry4);
