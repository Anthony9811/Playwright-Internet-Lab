# 🚀 Playwright-Internet-Lab
A modern automated testing framework built with Playwright and TypeScript, utilizing the Page Object Model (POM) architecture.

This project is a dedicated evolution of my previous Selenium-based automation, rebuilt from the ground up to master modern asynchronous testing patterns and Playwright's advanced tooling.

# 🛠 Tech Stack
* **Language**: TypeScript
* **Framework**: Playwright Test
* **Pattern**: Page Object Model (POM)
* **Target Site**: [The Internet (Herokuapp)](https://the-internet.herokuapp.com)

# 📂 Project Structure
The project follows a clean separation of concerns:

* `pages/`: Contains Page Objects (Locators and Page-specific actions).

* `tests/`: Contains test specifications and assertions.

* `playwright.config.ts`: Global configuration for browsers, retries, and reporting.

# 🌟 Key Features
* **BasePage Inheritance**: Shared logic and common navigation methods.

* **Auto-waiting**: Leveraging Playwright's built-in stability to eliminate "flaky" tests.

* **Cross-Browser Testing**: Configured to run across Chromium, Firefox, and WebKit.

* **Trace Viewer**: Detailed post-execution analysis for debugging.

# 🚦 Getting Started
### Prerequisites
* Node.js (v18 or higher)
* NPM (comes with Node)

### Installation
1. Clone the repository: `git clone https://github.com/Anthony9811/Playwright-Internet-Lab.git`
2. Install dependencies: `npm install`
3. Install Playwright Browsers: `npx playwright install`

### Running Tests
* Run all tests: `npx playwright test`
* Run in UI Mode (Interactive): `npx playwright test --ui`
* Generate Report: `npx playwright show-report`

# 📝 Evolution Notes
### Why the switch from Selenium?
While [my previous Selenium project](https://github.com/Anthony9811/selenium-pom-practice) focused on traditional WebDriver protocols, this project explores the benefits of the Playwright library, such as its auto-waiting mechanism, shadow DOM support, and the robust Trace Viewer for faster debugging.

# 🧠 Key Concepts & Exercises
**Exercise 1: Basic Login Test (Form Authentication)**

**Objective**: Automate the login process for the "The Internet" sample website.

**Concepts**: `page.locator`, `click`, `fill`, and **Asynchronous Web-First Assertions**.

**Transition Notes**: In Exercise 1, I replaced the Selenium `findElement` and `sendKeys` approach with Playwright’s `locator` and `fill`. Unlike my Selenium implementation, this version uses **Auto-waiting**, removing the need for manual `WebDriverWait` or `ExpectedConditions` for the login flash message.