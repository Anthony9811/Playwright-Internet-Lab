import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class MultipleWindowsPage extends HomePage {
  readonly clickHereButton;
  readonly newTabMessage;

  constructor(page:Page) {
    super(page);
    this.clickHereButton = page.getByRole('link', { name: 'Click Here' });;
    this.newTabMessage = page.locator('h3')
  }

  async openNewWindow() {
    await this.clickHereButton.click();
  }
}