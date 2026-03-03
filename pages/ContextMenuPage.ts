import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";


export class ContextMenuPage extends HomePage {
  readonly contextMenuBox;

  constructor(page:Page) {
    super(page);
    this.contextMenuBox = page.locator('#hot-spot');
  }

  async rightClickBox() {
    await this.contextMenuBox.click({ button: 'right' });
  }
}