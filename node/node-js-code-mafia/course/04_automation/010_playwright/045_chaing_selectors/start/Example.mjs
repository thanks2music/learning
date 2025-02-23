import { chromium } from '@playwright/test';

// @see セレクターのチェーンの利用方法(>>)
// 「大なり2つで要素を絞れる」
// https://playwright.dev/docs/selectors#chaining-selectors

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');

  // CSS セレクターで要素を取得した後、Playwrightのセレクターのチェーンを使って特定の要素を取得する
  // 「佐藤」さんを取得したい場合 3つ目の要素なので、0から数えて2
  const pageTitleLocator = page.locator('.cards.list-group-item > a >> nth=2');
  // 親要素を取得する場合「..」を使う
  const listGroupParent = page.locator('.cards.list-group-item >> ..');
  // locatorメソッドのセレクタチェーンは、分けて書く事も出来る
  const listGroupParent2 = page.locator('.cards.list-group-item');
  listGroupParent2.locator('..');
  const pageTitle = await pageTitleLocator.innerText();

  console.log(pageTitle);
  console.log(listGroupParent);
  console.log(listGroupParent2);

  await browser.close();
})();
