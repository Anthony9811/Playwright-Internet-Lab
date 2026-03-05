import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { DropdownPage } from "../pages/DropdownPage";

const dropdownOptions = ['Option 1', 'Option 2'];

for (const option of dropdownOptions) {
  test(`Selects ${option} from the dropdown`, async ({ page }) => {
    const dropdownPage = new DropdownPage(page);
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.clickOnDropdown();
    await dropdownPage.selectOption(option);

    //Is the current option 'Option 1'? If yes value is 1, otherwise is 2
    let expectedValue = (option === 'Option 1') ? '1' : '2';

    await expect(dropdownPage.dropdown).toHaveValue(expectedValue);
  });
}

test('should modify dropdown attributes to allow multiple selections', async ({ page }) => {
  const dropdownPage = new DropdownPage(page);
  const homePage = new HomePage(page);

  await homePage.open();
  await homePage.clickOnDropdown();

  await dropdownPage.dropdown.evaluate(element => element.setAttribute('multiple', ''));
  await dropdownPage.dropdown.selectOption(dropdownOptions);

  await expect(dropdownPage.dropdown).toHaveValues(['1', '2']);
})