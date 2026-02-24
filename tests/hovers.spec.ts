import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { HoversPage } from "../pages/HoversPage";

test('Hover over users', async ({ page }) => {
  const homePage = new HomePage(page);
  const hoversPage = new HoversPage(page);

  await homePage.open();
  await homePage.clickOnHovers();

  const profileCount = await hoversPage.userProfiles.count();

  for (let index = 0; index < profileCount; index++) {
    const profile = hoversPage.userProfiles.nth(index);
    const userData = hoversPage.getUserData(profile);
    const userNumber = index + 1;

    await profile.hover({ force: true });
    await expect(userData.name).toHaveText(`name: user${userNumber}`);
    await expect(userData.link).toHaveAttribute('href', `/users/${userNumber}`);
  }
})