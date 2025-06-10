import { GoogleSpreadsheet } from 'google-spreadsheet';
import env from 'dotenv';
env.config();
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const secrets = require('../../../google_secrets.json');
import { getEmployeesByScraping } from './scraping.mjs';

(async () => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: secrets.client_email,
    private_key: secrets.private_key
  });

  await doc.loadInfo();
  // スクレイピングしたデータを変数に格納
  const employees = await getEmployeesByScraping();
  let sheet = doc.sheetsByTitle['scraping'];
  if (!sheet) {
    sheet = await doc.addSheet({ title: 'scraping' });
  }
  const rows = await sheet.addRows(employees);

  rows.forEach(row => row.save());
})();
