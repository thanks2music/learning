import { GoogleSpreadsheet } from 'google-spreadsheet';
import env from 'dotenv';
env.config();
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const secrets = require('../../../google_secrets.json');

(async () => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: secrets.client_email,
    private_key: secrets.private_key
  });

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  await sheet.loadCells('A1:C5');

  const a1 = sheet.getCell(0, 0);
  const a5 = sheet.getCell(4, 0);
  const b1 = sheet.getCell(0, 1);
  const b2 = sheet.getCellByA1('B2');

  console.log('a1', a5.textFormat);
  // console.log('b1', b1.value);
  // console.log('b2', b2.value);

  a1.value = 13;
  b1.value = 20;
  b1.textFormat = { fontSize: 15, bold: true };
  a5.value = '=sum(A1:A4)';

  await sheet.saveUpdatedCells();
})();
