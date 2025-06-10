console.log('-----配列の分割代入-----');
const arry = ['配列1', '配列2', '配列3'];
const [a, , c] = ['配列1', '配列2', '配列3'];
console.log(a);
console.log(c);
console.log('-----配列の分割代入ここまで-----');
// console.log(arry[0]);
// console.log(arry[2]);

console.log('-----オブジェクトの分割代入-----');
const obj = { x: 'オブジェクト1', y: 'オブジェクト2', z: 'オブジェクト3' };
const { x, z } = { x: 'オブジェクト1', y: 'オブジェクト2', z: 'オブジェクト3' };
console.log(x);
console.log(z);
console.log('-----オブジェクトの分割代入ここまで-----');

console.log('-----関数の分割代入-----');
const arr = ['Japan', 'Tokyo', 'Shinjuku'];
const objAddress = { country: 'Japan', state: 'Tokyo', city: 'Shinjuku' };

const fnArr = arry => {
  console.log('---配列---');
  console.log(`country: ${arry[0]}`);
  console.log(`state: ${arry[1]}`);
  console.log(`city: ${arry[2]}`);
};

// 上記は、下記のように書き換えられる
const fnArr_es = ([country, state, city]) => {
  console.log('---配列ES Ver---');
  console.log(`country: ${country}`);
  console.log(`state: ${state}`);
  console.log(`city: ${city}`);
};

const fnObj = objAddr => {
  console.log('---オブジェクト---');
  console.log(`country: ${objAddr.country}`);
  console.log(`state: ${objAddr.state}`);
  console.log(`city: ${objAddr.city}`);
};

// 上記のオブジェクト関数は、下記のように書き換えられる
const fnObj_es = ({ country, state, city }) => {
  console.log('---オブジェクトES Ver---');
  console.log(`country: ${country}`);
  console.log(`state: ${state}`);
  console.log(`city: ${city}`);
};

fnArr_es(arr);
fnObj_es(objAddress);

console.log('-----関数の分割代入ここまで-----');
