import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class HorizontalSliderPage extends HomePage{
  readonly slider;
  readonly sliderValue;

  constructor(page:Page) {
    super(page);
    this.slider = page.getByRole('slider');
    this.sliderValue = page.locator('#range');
  }
}