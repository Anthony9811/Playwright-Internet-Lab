import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class LargeAndDeepDomPage extends HomePage {
  readonly table;

  constructor(page:Page) {
    super(page);
    this.table = page.locator('#large-table');
  }
}