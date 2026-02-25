import { Locator, Page } from "@playwright/test";

export class HomePage {
   private readonly page;
   private readonly formAuthenticationLink: Locator;
   private readonly dropdownLink: Locator;
   private readonly forgotPasswordLink: Locator;
   private readonly hoversLink: Locator;
   private readonly keyPressesLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formAuthenticationLink = page.getByText("Form Authentication");
    this.dropdownLink = page.getByText("Dropdown");
    this.forgotPasswordLink = page.getByText("Forgot Password");
    this.hoversLink = page.getByText("Hovers");
    this.keyPressesLink = page.getByText("Key Presses");
  }

  async clickOnFormAuthentication() {
    await this.formAuthenticationLink.click();
  }

  async clickOnDropdown() {
    await this.dropdownLink.click();
  }

  async clickOnForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async clickOnHovers() {
    await this.hoversLink.click();
  }

  async clickOnKeyPresses() {
    await this.keyPressesLink.click();
  }

  async open() {
    await this.page.goto('/');
  }
}