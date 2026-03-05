import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class DynamicLoadingPage extends HomePage {
  readonly example1;
  readonly example2;
  readonly startButton;
  readonly finalMessage;

  constructor(page:Page) {
    super(page);
    this.example1 = page.getByRole('link',  { name: 'Example 1' });
    this.example2 = page.getByRole('link',  { name: 'Example 2' });
    this.startButton = page.getByRole('button', { name: 'Start' });
    this.finalMessage = page.locator('#finish')
  }

  async openExample1() {
    await this.example1.click();
  }

  async openExample2(isNewTab: boolean = false) {
    if (isNewTab) {
    await this.example2.click({ modifiers: ['Control'] });
  } else {
    await this.example2.click();
  }
  }

  async clickStart() {
    await this.startButton.click();
  }
}