import { Page, Locator } from '@playwright/test';

export class DropdownPage {
  readonly dropdown: Locator;

  constructor(page: Page) {
    this.dropdown = page.locator('#dropdown');
  }

  async selectOption(option: string) {
    await this.dropdown.selectOption(option);
  }
}