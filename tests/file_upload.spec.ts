import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { FileUploadPage } from "../pages/FileUploadPage";
import path from "node:path";

test('Should select and upload a file', async ({ page }) => {
  const homePage = new HomePage(page);
  const fileUploadPage = new FileUploadPage(page);


  // **This calculates a portable dynamic path the correct way:**
  // 1. starts with __dirname which points to the 'tests' folder.
  // 2. goes up one level to the root of the project.
  // 3. go down into 'test-data'.
  // 4. selects the file.
  const filePath = path.join(__dirname, '..', 'test-data', 'image.jpg');

  await homePage.open();
  await homePage.clickOnFileUpload();
  
  await fileUploadPage.uploadFile(filePath);
  await expect(fileUploadPage.uploadedFileName).toHaveText("image.jpg");
  await expect(fileUploadPage.successMessage).toHaveText("File Uploaded!");
})