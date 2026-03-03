import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { NestedFramesPage } from "../pages/NestedFramesPage";


test('should verify the left frame text', async ({ page }) => {
  const homePage = new HomePage(page);
  const nestedFramesPage = new NestedFramesPage(page);

  await homePage.open();
  await homePage.clickOnNestedFrames();

  /*
  Points the frame locator (nestedFramesPage.leftFrame) 
  */
  await expect(nestedFramesPage.leftFrame.locator('body')).toHaveText("LEFT");
  await expect(nestedFramesPage.bottomFrame.locator('body')).toHaveText("BOTTOM");
})