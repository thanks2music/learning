import { chromium } from '@playwright/test';

/**
 * 練習問題
 * [佐藤]で検索して、一番最後に出てくる人物の名前を取得してください。
 */
(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');

  const inputLocator = page.locator('.text-center.mt-4 label input');
  await inputLocator.type('佐藤');

  const satoListLocator = page.locator('.cards.list-group-item >> nth=-1');
  const satoCount = await satoListLocator.count();
  const lastSatoName = await satoListLocator.innerText();
  console.log(lastSatoName);
  await browser.close();
})();
