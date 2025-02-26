import { chromium } from '@playwright/test';
import * as fs from 'fs';
import { Parser } from 'json2csv';

/**
 * 練習問題
 * 3ページ目の役職が係長の人物名と会社名をすべてtest-data.csvに出力しなさい。
 * ※会社名が取れない場合にも処理が止まらないように例外処理を追加してください。
 *
 * "company","name"
 * "山本金属株式会社","28 伊藤 友美"
 */
(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  // process.envの使い方と「.env」ファイルを後で
  // await page.goto(process.env.TARGET_URL);
  await page.goto('http://localhost:3000');
  const paginationLocator = page.locator('button.page-number').nth(2);
  console.log(paginationLocator);
  await paginationLocator.click();

  const cardLocators = page.locator('.cards.list-group-item');
  const cardCount = await cardLocators.count();

  const fetchedCards = [];
  for (let i = 0; i < cardCount; i++) {
    const cardLocator = cardLocators.locator(`nth=${i} >> a`);
    await cardLocator.click();

    const divisionLocator = page.locator('.division');
    const divisionText = await divisionLocator.textContent();
    const nameLocator = page.locator('.name');
    const nameText = await nameLocator.textContent();
    let companyText = '';

    try {
      const companyLocator = page.locator('.company');
      companyText = await companyLocator.textContent();
    } catch (error) {
      console.error('会社名の取得に失敗しました。');
    }

    console.log(
      `company: ${companyText}, division: ${divisionText}, name: ${nameText}`
    );

    // 係長の時だけ配列に追加する
    // このやり方だと、係長以外の時もコードが全て処理されるから、不要な処理が走ってしまう。
    if (divisionText.includes('係長')) {
      fetchedCards.push({
        company: companyText,
        name: nameText
      });
    }
    const backLocator = page.locator('text=戻る');
    await backLocator.click();
  }

  await browser.close();
  const parser = new Parser();
  const csv = parser.parse(fetchedCards);
  console.log(csv);

  fs.writeFileSync('./practice080-data.csv', csv);
})();
