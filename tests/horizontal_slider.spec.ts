import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { HorizontalSliderPage } from "../pages/HorizontalSliderPage";

test('Move horizontal slider to a defined value', async ({ page }) => {
  const homePage = new HomePage(page);
  const horizontalSliderPage = new HorizontalSliderPage(page);
  const targetValue = "4.5"; // Max: 5

  await homePage.open();
  await homePage.clickOnHorizontalSlider();

  await horizontalSliderPage.slider.focus()

  await expect(async () => {
    const currentValue = await horizontalSliderPage.sliderValue.textContent();
    
    /*
    I use toPass() here to handle a race condition becuase the automation sends
    keypresses faster than the browser can update the "#range" value.
    This polling approach ensures the target value won't be 'overshot' (e.g., landing on 3.5 instead of 2.5)
    by waiting for the UI to actually render the change before proceeding.
    */
    if (currentValue !== targetValue) {
      await horizontalSliderPage.slider.press('ArrowRight');
      
      //The error triggers a retry in case the target hasn't been reached
      throw new Error(`Slider is at ${currentValue}, retrying.`); 
    }
  }).toPass({
    intervals: [100], // Checks every 100ms
    timeout: 5000     // Give up after 5 seconds
  });

  await expect(horizontalSliderPage.sliderValue).toHaveText(targetValue);

})