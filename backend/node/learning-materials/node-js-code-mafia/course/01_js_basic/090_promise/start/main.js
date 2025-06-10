let a = 0;

new Promise((resolve, reject) => {
  setTimeout(() => {
    let r = -1;
    a = 2;
    resolve(a);
    reject(r);
  }, 2000);
})
  .then(b => {
    console.log(b);
    return b;
  })
  .then(b => {
    console.log(b);
  })
  .catch(c => {
    // catchはthenの後に書く
    console.log('catchが実行', c);
  });

console.log(a);
