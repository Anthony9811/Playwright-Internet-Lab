import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ModalPage } from "../pages/ModalPage";

test('should appear a pop-up on page open', async ({ page }) => {
  const homePage = new HomePage(page);
  const modalPage = new ModalPage(page);
  const modalBodyText = "It's commonly used to encourage a user to take an action"

  await homePage.open();
  await homePage.clickOnModal();

  await expect(modalPage.modalTitle).toHaveText("This is a modal window");
  await expect(modalPage.modalBody).toContainText(modalBodyText);
})

test('should re-enable the popup after closing it', async ({ page }) => {
  const homePage = new HomePage(page);
  const modalPage = new ModalPage(page);

  await homePage.open();
  await homePage.clickOnModal();

  await expect(modalPage.popupModal).toBeVisible();
  await modalPage.closeModal();

  await expect(modalPage.popupModal).toBeHidden({ timeout: 10000 });

  await modalPage.reEnableModal();
  await page.context().clearCookies();

  await homePage.open();
  await homePage.clickOnModal();

  await expect(modalPage.popupModal).toBeVisible();
})