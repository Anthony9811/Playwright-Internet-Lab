import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage";

test('Recovers a forgotten password via email', async ({ page }) => {
  const homePage = new HomePage(page);
  const forgotPasswordPage = new ForgotPasswordPage(page);
  const email = 'tau@example.com';
  const retrievePasswordMessage = page.getByRole('heading', {level: 1});

  await homePage.open();
  await homePage.clickOnForgotPassword();

  await forgotPasswordPage.typeEmail(email);
  await forgotPasswordPage.recoverPassword();

  await expect(retrievePasswordMessage).toHaveText('Internal Server Error');
})