import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class InfiniteScrollPage extends HomePage {
  readonly paragraphs;

  constructor(page: Page) {
    super(page);
    this.paragraphs = page.locator('internal:attr=[class="jscroll-added"]');
  }
}