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
  await inputLocator.type('藤');

  const pagerLocator = page.locator('.page-link.page-number');

  if ((await pagerLocator.count()) > 1) {
    const lastPagerLocator = pagerLocator.locator('nth=-1');
    await lastPagerLocator.click();
  }

  // Teacher's Answer Version
  const lastCardLocator = page.locator('.cards.list-group-item >> nth=-1');
  // @NOTE: 「innerText()と、textContent()の違いについて」
  // DOMのAPIで、「textContent()」と、「innerText()」プロパティが存在する。
  // 「textContent」は、要素の中の文字列を取得するもの
  // 「innerText」の要素の中で、表示されているものだけを取得するもの
  const lastCardName = await lastCardLocator.textContent();
  console.log(lastCardName);

  // My Answer Version
  // const satoListLocator = page.locator('.cards.list-group-item >> nth=-1');
  // const satoCount = await satoListLocator.count();
  // 「innerText」では、display: noneや、visibility: hiddenの要素は取得出来ない
  // const lastSatoName = await satoListLocator.innerText();
  // console.log(lastSatoName);
  // await browser.close();
})();
