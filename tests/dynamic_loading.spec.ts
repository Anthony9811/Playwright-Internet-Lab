import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { DynamicLoadingPage } from "../pages/DynamicLoadingPage";

test('should wait for hidden element to become visible', async ({ page }) => {
  const homePage = new HomePage(page);
  const dynamicLoadingPage = new DynamicLoadingPage(page);

  await homePage.open();
  await homePage.clickOnDynamicLoading();

  await dynamicLoadingPage.openExample1();
  await dynamicLoadingPage.clickStart();

  await expect(dynamicLoadingPage.finalMessage).toBeVisible({ timeout: 10000 });
  await expect(dynamicLoadingPage.finalMessage).toHaveText("Hello World!");
});

test('should wait for element to be rendered in the DOM', async ({ page }) => {
  const homePage = new HomePage(page);
  const dynamicLoadingPage = new DynamicLoadingPage(page);

  await homePage.open();
  await homePage.clickOnDynamicLoading();

  await dynamicLoadingPage.openExample2();
  await dynamicLoadingPage.clickStart();

  await expect(dynamicLoadingPage.finalMessage).toBeVisible({ timeout: 10000 });
  await expect(dynamicLoadingPage.finalMessage).toHaveText("Hello World!");
})

test('should open Example 2 in a new tab', async ({ page, context }) => {
  const homePage = new HomePage(page);
  const dynamicLoadingPage = new DynamicLoadingPage(page);
  const newTabPromise = context.waitForEvent('page');

  await homePage.open();
  await homePage.clickOnDynamicLoading();

  await dynamicLoadingPage.openExample2(true);

  const newTab = await newTabPromise;
  await newTab.bringToFront();

  const startButton = newTab.getByRole('button', { name: 'Start' });
  await expect(startButton).toBeVisible();
})