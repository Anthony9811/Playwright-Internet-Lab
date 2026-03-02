import { Locator, Page } from "@playwright/test";
import { HomePage } from "./HomePage";


export class FileUploadPage extends HomePage {
  private readonly selectFileButton: Locator;
  private readonly uploadButton: Locator;
  readonly uploadedFileName: Locator;
  readonly successMessage: Locator;

  constructor(page:Page){
    super(page);
    this.selectFileButton = page.locator('#file-upload');
    this.uploadButton = page.locator('#file-submit')
    this.uploadedFileName = page.locator('#uploaded-files');
    this.successMessage = page.locator('h3');
  }

  async uploadFile(filePath:string) {
    await this.selectFileButton.setInputFiles(filePath);
    await this.uploadButton.click();
  }
}