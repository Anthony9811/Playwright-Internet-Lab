import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DropdownPage extends BasePage {
  readonly dropdownElement: Locator;

  constructor(page: Page) {
    super(page);
    this.dropdownElement = page.locator("#dropdown");
  }

  async selectOption(option: string){ 
    await this.dropdownElement.selectOption(option);
  }
}