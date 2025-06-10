import { GoogleSpreadsheet } from 'google-spreadsheet';
import env from 'dotenv';
env.config();
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const secrets = require('../../../google_secrets.json');

/**
 * 問題：
 * 以下の値をシートを完成させてください。
 * * `cart` シートの作成、name, priceの挿入は手動で行ってください。
 * name   | price
 * Orange | 120
 * Banana | 50
 * Apple  | 100
 * 合計    | 270
 */
(async () => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: secrets.client_email,
    private_key: secrets.private_key
  });

  await doc.loadInfo();
  // シートを作成し、ヘッダー行も同時に追加する
  await doc.addSheet({ title: 'cart', headerValues: ['name', 'price'] });
  // 追加したシートを取得する
  const cartSheet = doc.sheetsByTitle['cart'];
  // 行を追加する
  const rows = await cartSheet.addRows([
    {
      name: 'Orange',
      price: 120
    },
    {
      name: 'Banana',
      price: 50
    },
    {
      name: 'Apple',
      price: 100
    },
    {
      name: '合計',
      price: '=sum(B2:B4)' // 追加時に「=sum」関数が無事に動作した。
    }
  ]);

  // addRowsで追加時に、「=sum」が正しく動作しない場合
  // 合計を計算するため、セルを取得する
  // const totalCell = cartSheet.getCellByA1('B4');
  // totalCell.value = '=sum(B2:B4)';
  // await cartSheet.saveUpdatedCells();
})();
