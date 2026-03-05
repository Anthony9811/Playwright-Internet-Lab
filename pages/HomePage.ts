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
   private readonly FileUploadLink: Locator;
   private readonly entryAdLink: Locator;
   private readonly contextMenuLink: Locator;
   private readonly nestedFramesLink: Locator;
   private readonly dynamicLoadingLink: Locator;
   private readonly infiniteScrollLink: Locator;
   private readonly largeAndDeepDomLink: Locator;
   private readonly multipleWindowsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formAuthenticationLink = page.getByText("Form Authentication");
    this.dropdownLink = page.getByText("Dropdown");
    this.forgotPasswordLink = page.getByText("Forgot Password");
    this.hoversLink = page.getByText("Hovers");
    this.keyPressesLink = page.getByText("Key Presses");
    this.horizontalSliderLink = page.getByText("Horizontal Slider");
    this.AlertsLink = page.getByText("JavaScript Alerts");
    this.FileUploadLink = page.getByText("File Upload");
    this.entryAdLink = page.getByText("Entry Ad");
    this.contextMenuLink = page.getByText("Context Menu");
    this.nestedFramesLink = page.getByText("Nested Frames");
    this.dynamicLoadingLink = page.getByText("Dynamic Loading");
    this.infiniteScrollLink = page.getByText("Infinite Scroll");
    this.largeAndDeepDomLink = page.getByText("Large & Deep DOM");
    this.multipleWindowsLink = page.getByText("Multiple Windows");
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

  async clickOnFileUpload() {
    await this.FileUploadLink.click();
  }

  async clickOnModal() {
    await this.entryAdLink.click();
  }

  async clickOnContextMenu() {
    await this.contextMenuLink.click();
  }

  async clickOnNestedFrames() {
    await this.nestedFramesLink.click();
  }

  async clickOnDynamicLoading() {
    await this.dynamicLoadingLink.click();
  }

  async clickOnInfiniteScroll() {
    await this.infiniteScrollLink.click();
  }

  async clickOnLargeAndDeepDom() {
    await this.largeAndDeepDomLink.click();
  }

  async clickOnMultipleWindows() {
    await this.multipleWindowsLink.click();
  }

  async open() {
    await this.page.goto('/');
  }
}