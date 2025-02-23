import { chromium } from '@playwright/test';
import * as fs from 'fs';
import { Parser } from 'json2csv';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');

  const cardLocators = page.locator('.cards.list-group-item');
  const cardCount = await cardLocators.count();

  const fetchedCards = [];
  for (let i = 0; i < cardCount; i++) {
    const cardLocator = cardLocators.locator(`nth=${i}`);
    const cardText = await cardLocator.textContent();
    // 下記の書き方で、配列にプッシュ出来る。(が後にCSVに保存したいため、オブジェクト形式でプッシュする事とする。
    // fetchedCards.push(cardText);[
    // 以下のように、キーを設定して値を保存すれば配列にオブジェクトを保存する形となる
    fetchedCards.push({
      name: cardText // 配列の中身 https://gyazo.com/887e18861f1d56edec44b88ba3ca0ed2/raw
    });
  }

  await browser.close();
  const parser = new Parser();
  const csv = parser.parse(fetchedCards);
  console.log(csv);

  fs.writeFileSync('./text-data.csv', csv);
})();
