# 🚀 Playwright-Internet-Lab
A modern automated testing framework built with Playwright and TypeScript, utilizing the Page Object Model (POM) architecture.

This project is a dedicated evolution of my previous Selenium-based automation, rebuilt from the ground up to master modern asynchronous testing patterns and Playwright's advanced tooling.

# 🚀 Continuous Integration
This project utilizes GitHub Actions to ensure code quality and cross-browser compatibility with every change.

* **Automated Runs:** Tests are triggered automatically on `push` to `main` and all `pull_requests`.

* **Environment:** Runs on `ubuntu-latest` using a clean Node.js environment.

* **Reporting:** On failure, the Playwright HTML report and Trace files are uploaded as artifacts for remote debugging.

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

**Exercise 2: Data-Driven Dropdown Selection**

**Objective**: Automate a dropdown menu to select options using a parameterized data approach.

**Concepts**: `selectOption`, `expect().toHaveValue()`, and **Array-based test loops**.

**Exercise 3: Forgot Password Workflow**

**Objective**: Validate the "Forgot Password" functionality by submitting an email and verifying the resulting message.

**Concepts**: Element interaction, text validation, and handling a basic user flow.

#### **⚠️ Note**: This test cannot be successfully completed as intended at the moment due to an "Internal Server Error" appearing on the site after submission. Following the original requirements, the application should redirect to a confirmation page displaying "Your e-mail's been sent!".
#### In this Playwright implementation, I have also opted to validate the presence of the "Internal Server Error" message. This approach avoids a test timeout (Playwright's equivalent of a `NoSuchElementException`) and serves as a monitoring tool: the test will "fail" once the developers fix the site, alerting me to update the assertion to the correct success message.

**Exercise 4: Hover Interactions**

**Objective**: Reveal and validate hidden captions by hovering over user profiles across different browser engines.

**Concepts**: `hover()`, Scoped Locators, and Browser Engine Debugging.

#### 🛠️ Challenges & Solutions
* **Static vs. Dynamic Locators:** Initially, using `locator.all()` caused the test to fail because it captured a snapshot of the page before navigation was complete. Switching to `locator.nth()` allowed Playwright’s auto-waiting logic to handle the page transition properly.

* **The "Firefox/Webkit" Hurdle:** Webkit struggled to "paint" the hidden caption fast enough, requiring a more assertive hover.

    * **Firefox** tended to retain pointer focus on the first element, preventing subsequent hovers.

    * **Solution:** I implemented `hover({ force: true })` which forced the virtual cursor to move and trigger the necessary state changes across all engines (Chromium, Firefox, and Webkit).