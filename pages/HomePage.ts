import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class HomePage extends BasePage {
   private readonly formAuthenticationLink: Locator;
   private readonly dropdownLink: Locator;

  constructor(page: Page) {
    super(page);
    this.formAuthenticationLink = page.getByText("Form Authentication");
    this.dropdownLink = page.getByText("Dropdown")
  }

  async clickOnFormAuthentication() {
    await this.formAuthenticationLink.click();
  }

  async clickOnDropdown() {
    await this.dropdownLink.click();
  }

  async open() {
    await this.navigateTo('/');
  }
}