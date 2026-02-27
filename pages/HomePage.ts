import { Locator, Page } from "@playwright/test";

export class HomePage {
   private readonly page;
   private readonly formAuthenticationLink: Locator;
   private readonly dropdownLink: Locator;
   private readonly forgotPasswordLink: Locator;
   private readonly hoversLink: Locator;
   private readonly keyPressesLink: Locator;
   private readonly horizontalSliderLink: Locator;
   private readonly AlertsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formAuthenticationLink = page.getByText("Form Authentication");
    this.dropdownLink = page.getByText("Dropdown");
    this.forgotPasswordLink = page.getByText("Forgot Password");
    this.hoversLink = page.getByText("Hovers");
    this.keyPressesLink = page.getByText("Key Presses");
    this.horizontalSliderLink = page.getByText("Horizontal Slider");
    this.AlertsLink = page.getByText("JavaScript Alerts");
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

  async clickOnHorizontalSlider() {
    await this.horizontalSliderLink.click();
  }

  async clickOnJavascriptAlerts() {
    await this.AlertsLink.click();
  }

  async open() {
    await this.page.goto('/');
  }
}