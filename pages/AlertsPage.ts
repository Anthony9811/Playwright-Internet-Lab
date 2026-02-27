import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class AlertsPage extends HomePage {
  private readonly javascriptAlert;
  private readonly javascriptConfirm;
  private readonly javascriptPrompt;
  readonly resultMessage;

  constructor(page: Page) {
    super(page);
    this.javascriptAlert = page.getByText('Click for JS Alert');
    this.javascriptConfirm = page.getByText('Click for JS Confirm');
    this.javascriptPrompt = page.getByText('Click for JS Prompt');
    this.resultMessage = page.locator('#result');
  }

  async clickOnAlert() {
    await this.javascriptAlert.click();
  }

  async clickOnConfirm() {
    await this.javascriptConfirm.click();
  }

  async clickOnPrompt() {
    await this.javascriptPrompt.click();
  }
}