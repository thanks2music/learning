// 非同期処理（Promise）
let a = 0;

init();
async function init() {
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        a = 1;
        reject(a);
      }, 2000);
    });
    console.log(result);
  } catch (error) {
    console.log('catchが実行', error);
  }
}
