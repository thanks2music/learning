import { chromium } from '@playwright/test';

async function getEmployeesByScraping() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');

  const cardLocators = page.locator('.cards.list-group-item');
  const cardCount = await cardLocators.count();

  const fetchedCards = [];
  for (let i = 0; i < cardCount; i++) {
    const cardLocator = cardLocators.locator(`nth=${i} >> a`);
    const cardText = await cardLocator.textContent();

    await cardLocator.click();
    const companyLocator = page.locator('.card-title.company');
    const companyText = await companyLocator.textContent();

    fetchedCards.push({
      company: companyText,
      name: cardText
    });

    const backLocator = page.locator('text=戻る');
    await backLocator.click();
  }

  await browser.close();

  // 「040_crawl_and_write」では、CSVに変換してファイルを作成する必要がないため、以下は不要
  // const parser = new Parser();
  // const csv = parser.parse(fetchedCards);
  // fs.writeFileSync('./text-data.csv', csv);

  // エクスポートして、呼び出し元でデータを使えるようにするため、return文を追加しないといけない
  return fetchedCards;
}

export { getEmployeesByScraping };
