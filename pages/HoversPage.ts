import { Page, Locator } from '@playwright/test';
import { HomePage } from './HomePage';

export class HoversPage extends HomePage{
  readonly userProfiles;
  readonly userName;
  readonly userProfileLink;

  constructor(page:Page) {
    super(page);
    this.userProfiles = page.locator('.figure');
    this.userName = page.locator("h5");
    this.userProfileLink = page.getByText("View Profile");
  }

  // Helper to get locators INSIDE a specific profile
  getUserData(profile: Locator) {
    return {
      name: profile.locator('h5'),
      link: profile.locator('a')
    };
  }
}