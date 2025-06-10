import { chromium } from '@playwright/test';

// @see セレクターのチェーンの利用方法(>>)
// https://playwright.dev/docs/selectors#chaining-selectors

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');

  // waitForTimeoutは、デバッグ時などに使える待機させるメソッド
  await page.waitForTimeout(2000);
  // CSS セレクターで要素を取得
  // @NOTE: Locatorは、DOMとは異なり、要素を取得するためのオブジェクト
  const inputLocator = page.locator('.text-center.mt-4 > label > input');
  // typeメソッドで、inputを入力出来る
  await inputLocator.type('美');

  const pager3Locator = page.locator('.page-link.page-number >> nth=-1');
  await pager3Locator.click();

  debugger;

  const cardLocator = page.locator('.cards.list-group-item');
  const cardCount = await cardLocator.count();
  console.log(cardCount);

  // await browser.close();
})();
