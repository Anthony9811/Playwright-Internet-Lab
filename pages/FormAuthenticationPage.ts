import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class FormAuthenticationPage extends BasePage {
  private readonly userNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  readonly successfulLoginMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.userNameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator(".radius");
    this.successfulLoginMessage = page.locator("#flash")
  }

  async login(userName: string, password: string) {
    await this.userNameInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}