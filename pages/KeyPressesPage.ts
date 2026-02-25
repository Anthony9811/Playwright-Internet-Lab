import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class KeyPressesPage extends HomePage{
  readonly inputField;
  readonly enteredKey;

  constructor(page:Page) {
    super(page);
    this.inputField = page.getByRole('textbox');
    this.enteredKey = page.getByText(/You entered:/);
  }
}