import { Locator, Page } from "@playwright/test";
import { HomePage } from "./HomePage";


export class NestedFramesPage extends HomePage {
  readonly leftFrame;
  readonly bottomFrame;

  constructor(page:Page){ 
    super(page);
    this.leftFrame = page.frameLocator('frame[name="frame-top"]').frameLocator('frame[name="frame-left"]');
    this.bottomFrame = page.frameLocator('frame[name="frame-bottom"]');
  }

  
}