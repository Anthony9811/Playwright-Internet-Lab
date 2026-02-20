import { Page, Locator } from '@playwright/test';

export class DropdownPage {
  readonly dropdownElement: Locator;

  constructor(page: Page) {
    this.dropdownElement = page.locator("#dropdown");
  }

  async selectOption(option: string){ 
    await this.dropdownElement.selectOption(option);
  }
}