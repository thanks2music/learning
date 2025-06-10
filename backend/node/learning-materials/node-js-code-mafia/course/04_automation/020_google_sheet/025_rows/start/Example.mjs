import { GoogleSpreadsheet } from 'google-spreadsheet';
import env from 'dotenv';
env.config();
import { createRequire } from 'module';
// import { head } from 'lodash';
const require = createRequire(import.meta.url);
const secrets = require('../../../google_secrets.json');

(async () => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: secrets.client_email,
    private_key: secrets.private_key
  });

  await doc.loadInfo();

  // シートを追加し、ヘッダー行も同時に追加する
  // await doc.addSheet({
  //   title: 'persons',
  //   headerValues: ['name', 'age', 'gender']
  // });

  // シートを取得する
  const personSheet = doc.sheetsByTitle['persons'];
  // 「addRow()」メソッドを使うことで、行を追加できる
  // addRowの戻り値に「row」が返る。この「row」に対して値を設定し、実行する事で書き込み出来る。
  // const row1 = await personSheet.addRow({
  //   name: 'Tom',
  //   age: 18,
  //   gender: 'M'
  // });

  // 「値を更新する場合」は、save()メソッドを呼ぶ必要がある。
  // row1.save();

  // 「addRows()」メソッドを使うことで、複数の行を追加できる
  const rows = await personSheet.addRows([
    {
      name: 'Tom',
      age: 22,
      gender: 'M'
    },
    {
      name: 'Hanako',
      age: 20,
      gender: 'F'
    },
    {
      name: 'John',
      age: 25,
      gender: 'M'
    }
  ]);

  // 配列が返るため、for文や、forEach()メソッドを使って、値を更新する
  // for文の場合
  // for (const row of rows) {
  //   await row.save();
  // }

  // forEach()メソッドの場合
  // 動画で説明されていた、以下の形式は間違い。
  // rows.forEach(row => async () => {
  //   await row.save();
  // });
  // 正しい形式は以下の通り、「rows.forEach(async (row) => await row.save());」となる。
  rows.forEach(async row => {
    await row.save();
  });

  /*
  修正とお詫び
  save()メソッドが必要なのは値を "更新する" ときでした。
  そのため、addRows()を実行するだけでGoogle Spreadシートに書き込みが行われます。
  値を更新する際はsave()を呼ばないと反映されません。
  また、動画内ではnewRows.forEach(row => async () => await row.save());としていますが、
  これではasync () => await row.save()は実行されないため、
  仮に書くとしても正しくはnewRows.forEach(async (row) => await row.save());となります。
   */
  // rows.forEach(row => async () => {
  //   await row.save();
  // });
})();
