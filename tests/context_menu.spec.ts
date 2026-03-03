import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ContextMenuPage } from "../pages/ContextMenuPage";

test('should trigger an alert when right-clicking a box', async ({ page }) => {
  const homePage = new HomePage(page);
  const contextMenuPage = new ContextMenuPage(page);

  await homePage.open();
  await homePage.clickOnContextMenu();

  await page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('You selected a context menu');
    await dialog.accept();
  });
  
  await contextMenuPage.rightClickBox();

})