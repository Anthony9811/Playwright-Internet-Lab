import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class HomePage extends BasePage {
   readonly formAuthenticationLink: Locator;

  constructor(page: Page) {
    super(page);
    this.formAuthenticationLink = page.getByText("Form Authentication");
  }

  async clickOnFormAuthentication() {
    await this.formAuthenticationLink.click();
  }

  async open() {
    await this.navigateTo('/');
  }
}