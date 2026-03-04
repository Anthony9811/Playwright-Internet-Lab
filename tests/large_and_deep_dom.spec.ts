import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LargeAndDeepDomPage } from "../pages/LargeAndDeepDomPage";

test('should bring a nested table into view', async ({ page }) => {
  const homePage = new HomePage(page);
  const largeAndDeepDomPage = new LargeAndDeepDomPage(page);

  await homePage.open();
  await homePage.clickOnLargeAndDeepDom();

  await largeAndDeepDomPage.table.scrollIntoViewIfNeeded();

  await expect(largeAndDeepDomPage.table).toBeVisible();
})