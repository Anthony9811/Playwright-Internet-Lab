import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { InfiniteScrollPage } from "../pages/InfiniteScrollPage";


test('should scroll to a specific paragraph', async ({ page }) => {
  const homePage = new HomePage(page);
  const infiniteScrollPage = new InfiniteScrollPage(page);
  const paragraphNumber = 5;
  let paragraphCount = await infiniteScrollPage.paragraphs.count();

  await homePage.open();
  await homePage.clickOnInfiniteScroll();
  

  while (paragraphCount <= paragraphNumber) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    paragraphCount = await infiniteScrollPage.paragraphs.count();
  }

  await expect(infiniteScrollPage.paragraphs.nth(paragraphNumber - 1)).toBeVisible();
})