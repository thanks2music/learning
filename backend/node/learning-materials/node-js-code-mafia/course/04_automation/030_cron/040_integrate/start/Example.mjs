import cron from 'node-cron';
import { addEmployeesToGS } from './google-sheet.mjs';
import { sendEmail } from './email.mjs';

// 開発中は、Cronをコメントアウトしておいて、
// 特定の関数を必ず実行出来る状態で進める。
// 本番環境にデプロイする際に、Cronを有効にする。
cron.schedule('46 20 * * *', () => {
  main();
});

// main();

// 関数は、asyncが必要
async function main() {
  const dt = new Date();
  const dtStr = dt.toDateString();
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}`;
  // エラーが発生した場合、try / catchでエラーをキャッチする
  try {
    // エラーを確認する
    // awaitを使っているため
    await addEmployeesToGS();
    sendEmail('処理が成功しました', `処理成功時刻： ${dtStr}\n\n${sheetUrl}`);
  } catch (e) {
    sendEmail(
      'エラーが発生しました',
      `エラー発生時刻： ${dtStr}\n\nエラーログ：${e}`
    );
  }
}
