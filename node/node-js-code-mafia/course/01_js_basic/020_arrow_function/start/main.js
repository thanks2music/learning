function fn(number) {
  return number * 2;
}

console.log(fn(2));

const fnArrow = (number) => {
  return number * 2;
}

console.log(fnArrow(2));

// 引数が一つの時は、まる括弧が不要
const fnArrow3 = number => {
  return number * 2;
}

console.log(fnArrow3(2));

// まる括弧が必須
const fnArrow4 = (number, index) => {
  return number * 2;
}

// 引数が一つの時、かつ、returnが1行の時は、returnと{}が不要
const fnArrow5 = number => number * 2;
console.log(fnArrow5(2));
// まる括弧があってもエラーにはならない
const fnArrow2 = (number) => number * 2;
