import { chromium } from '@playwright/test';

// @see https://playwright.dev/docs/api/class-browsertype#browser-type-launch
// awaitを使っているため、async関数で無名関数として実行する
(async () => {
  // Run the browser
  // chromium.launchでブラウザを起動、戻り値はインスタンスが返る
  // const browserは、ブラウザの一つのタブと思うと理解しやすい
  // headless: falseとするとブラウザを表示する
  // slowMo: 500とすると、500ミリ秒遅延させる
  const browser = await chromium.launch({ headless: true, slowMo: 500 });
  // newPageメソッドでページを開く
  const page = await browser.newPage();
  // gotoメソッドでページにアクセスする
  await page.goto('http://localhost:3000');
  // contentメソッドでページのHTMLを取得する
  const htmlStr = await page.content();
  // console.log(htmlStr);

  // Locatorメソッドで要素を取得する
  // @seehttps://playwright.dev/docs/selectors
  const pageTitleLocator = page.locator('.navbar-brand');
  const pageTitle = await pageTitleLocator.innerText();
  console.log('CSS セレクターで絞り込み', pageTitle);
  // 文字列で要素を取得する場合
  const textLocator = page.locator('text=名刺管理アプリ');
  const textPageTitle = await textLocator.innerText();
  console.log('文字列で絞り込み', textPageTitle);
  // Xpathで要素を取得する場合
  const xpathLocator = page.locator(`xpath=//*[@id="__next"]/nav/div/a`);
  const xpathPageText = await textLocator.innerText();
  console.log('xpathで絞り込み', xpathPageText);
  // 処理が終わったら、ブラウザを閉じる
  await browser.close();
})();
