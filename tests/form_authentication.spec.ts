import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { FormAuthenticationPage } from "../pages/FormAuthenticationPage";


test('User login with valid credentials', async ({ page }) => {
  const homePage = new HomePage(page);
  const formAuthenticationPage = new FormAuthenticationPage(page);
  const userName = "tomsmith";
  const password = "SuperSecretPassword!";

  await homePage.open();
  await homePage.clickOnFormAuthentication();
  await formAuthenticationPage.login(userName, password);
  await expect(formAuthenticationPage.successfulLoginMessage).toBeVisible();
})