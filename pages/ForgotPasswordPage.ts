import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ForgotPasswordPage extends BasePage{
  private readonly emailInput: Locator;
  private readonly submitButton: Locator;

  constructor(page:Page) {
    super(page);
    this.emailInput = page.locator("#email");
    this.submitButton = page.locator("#form_submit");
  }

  async typeEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async recoverPassword() {
    await this.submitButton.click();
  }
}