import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";


export class ModalPage extends HomePage {
  readonly popupModal;
  readonly modalTitle;
  readonly modalBody;
  private readonly closeModalButton;
  private readonly reEnableModalButton;

  constructor(page: Page) {
    super(page);
    this.popupModal = page.locator('#modal');
    this.modalTitle = page.getByText('Modal Window', { exact: false });
    this.modalBody = page.getByText('encourage a user', { exact: false });
    this.reEnableModalButton = page.getByRole('link', { name: 'click here' });
    this.closeModalButton = page.locator('.modal-footer p');
  }

  async closeModal() {
    this.closeModalButton.click();
  }

  async reEnableModal() {
    await this.reEnableModalButton.waitFor({ state: 'visible' });
    this.reEnableModalButton.click();
  }
}