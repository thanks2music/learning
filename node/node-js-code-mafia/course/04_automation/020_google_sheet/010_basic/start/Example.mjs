// Googleスプレッドシートのモデュールを読み込み
import { GoogleSpreadsheet } from 'google-spreadsheet';
// dotenvのモジュールを読み込み
import env from 'dotenv';
// 「.env」ファイルを作成後、「.config()」メソッドを事項すると設定を読み込める
env.config();
// .envに記載するのがベターだが、Google Cloudでダウンロードした「json」を使っても良い
// 今回は、復習をかねて「.json」を使う方式で実装を進める
import { createRequire } from 'module';
// ES Moduleで「require」を使うためには、createRequireを使う
// createRequireでは、パスを引数に渡す必要があり、慣例的にimport.meta.urlを使う
// import.meta.urlでは、現在のファイルのURLを取得できる
// そのため、const requireは、現在のファイルから見た、パスを記述する
const require = createRequire(import.meta.url);
const secrets = require('../../../google_secrets.json');

// 即時関数で非同期処理を実行
(async () => {
  // 新しいスプレッドシートのインスタンスにIDを渡す
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  // 非同期で認証処理
  await doc.useServiceAccountAuth({
    client_email: secrets.client_email,
    private_key: secrets.private_key
  });

  // 非同期でシートを読み込む
  await doc.loadInfo();
  // インデックスでシートを取得 (一番左のシートは、0)
  const sheet = doc.sheetsByIndex[0];
  await sheet.loadCells('A1:C4');
  // console.log(sheet);

  const a1 = sheet.getCell(0, 0);
  const b1 = sheet.getCell(0, 1);
  const b2 = sheet.getCellByA1('B2');
  const b4 = sheet.getCellByA1('B4');
  console.log('a1 = ', a1.value);
  console.log('b1 = ', b1.value);
  console.log('b2 = ', b2.value);
  console.log('b4 = ', b4.value);
})();
