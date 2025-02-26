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
    const cardLocator = cardLocators.locator(`nth=${i} >> a`);
    // カードのテキストを取得する
    const cardText = await cardLocator.textContent();
    // クリックイベントで、ページ遷移させる
    await cardLocator.click();
    // 会社名を取得する
    const companyLocator = page.locator('.card-title.company');

    const companyText = await companyLocator.textContent();
    // 下記の書き方で、配列にプッシュ出来る。(が後にCSVに保存したいため、オブジェクト形式でプッシュする事とする。
    // fetchedCards.push(cardText);[
    // 以下のように、キーを設定して値を保存すれば配列にオブジェクトを保存する形となる
    fetchedCards.push({
      // 最初の段階の配列の中身 https://gyazo.com/887e18861f1d56edec44b88ba3ca0ed2/raw
      company: companyText,
      name: cardText
    });

    // 複数のページに跨って情報を取得する場合、戻るボタンをクリックして前のページに戻る必要がある
    // 例: 1つ目のカードをクリックして、1つ目のカード詳細に遷移し、情報を取得した後、1ページ目に戻って、2つ目のカードをクリックして、2つ目のカード詳細に遷移する。これを要素数分繰り返す
    const backLocator = page.locator('text=戻る');
    await backLocator.click();
  }

  await browser.close();
  const parser = new Parser();
  const csv = parser.parse(fetchedCards);
  console.log(csv);

  fs.writeFileSync('./text-data.csv', csv);
})();
