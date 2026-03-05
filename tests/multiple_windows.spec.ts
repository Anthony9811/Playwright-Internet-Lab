import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { MultipleWindowsPage } from "../pages/MultipleWindowsPage";

test('should open a new window and validate the content', async ({ page, context }) => {
  const homePage = new HomePage(page);
  const multipleWindowsPage = new MultipleWindowsPage(page);
  const newTabPromise = context.waitForEvent('page');

  await homePage.open();
  await homePage.clickOnMultipleWindows();

  await multipleWindowsPage.openNewWindow();

  const newTab = await newTabPromise;
  const newTabContent = newTab.locator('h3');

  await expect(newTab).toHaveTitle("New Window");
  await expect(newTabContent).toHaveText("New Window");
})