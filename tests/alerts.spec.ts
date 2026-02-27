import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { AlertsPage } from "../pages/AlertsPage";

test('Should validate the message from an alert', async ({ page }) => {
  const homePage = new HomePage(page);
  const alertsPage = new AlertsPage(page);

  await homePage.open();
  await homePage.clickOnJavascriptAlerts();

  await page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('I am a JS Alert');
    await dialog.accept();
  });

  await alertsPage.clickOnAlert();

  await expect(alertsPage.resultMessage).toHaveText('You successfully clicked an alert');
});

test('Should open an alert and click confirm', async ({ page }) => {
  const homePage = new HomePage(page);
  const alertsPage = new AlertsPage(page);

  await homePage.open();
  await homePage.clickOnJavascriptAlerts();

  await page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('I am a JS Confirm');
    await dialog.accept();
  });

  await alertsPage.clickOnConfirm();

  await expect(alertsPage.resultMessage).toHaveText('You clicked: OK');
});


test.only('Should write on a prompt dialog and verify the result', async ({ page }) => {
  const homePage = new HomePage(page);
  const alertsPage = new AlertsPage(page);
  const promptInput = "Hello World";

  await homePage.open();
  await homePage.clickOnJavascriptAlerts();

  await page.on('dialog', async dialog => {
    await dialog.accept(promptInput);
  });

  await alertsPage.clickOnPrompt();

  await expect(alertsPage.resultMessage).toHaveText(`You entered: ${promptInput}`);
});