import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { KeyPressesPage } from "../pages/KeyPressesPage";

test('Verify feedback for keyboard keys', async ({ page }) => {
  const homePage = new HomePage(page);
  const keyPressesPage = new KeyPressesPage(page);
  const testKeys = ['A', '1', 'Control', 'Escape', 'Tab'];

  await homePage.open();
  await homePage.clickOnKeyPresses();

  for (const key of testKeys) {
  await keyPressesPage.inputField.focus();
  await keyPressesPage.inputField.press(key);
  await expect(keyPressesPage.enteredKey).toContainText(key.toUpperCase());   
  }
})