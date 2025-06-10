import { addEmployeesToGoogleSheet } from './google-sheet.mjs';
import cron from 'node-cron';

cron.schedule('38 13 * * * ', () => {
  console.log('毎分に実行');
  addEmployeesToGoogleSheet();
});
