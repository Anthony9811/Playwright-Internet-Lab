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
### **Exercise 1: Basic Login Test (Form Authentication)**

**Objective**: Automate the login process for the "The Internet" sample website.

**Concepts**: `page.locator`, `click`, `fill`, and **Asynchronous Web-First Assertions**.

**Transition Notes**: In Exercise 1, I replaced the Selenium `findElement` and `sendKeys` approach with Playwright’s `locator` and `fill`. Unlike my Selenium implementation, this version uses **Auto-waiting**, removing the need for manual `WebDriverWait` or `ExpectedConditions` for the login flash message.

### **Exercise 2: Data-Driven Dropdown Selection**

**Objective**: Automate a dropdown menu to select options using a parameterized data approach.

**Concepts**: `selectOption`, `expect().toHaveValue()`, and **Array-based test loops**.

### **Exercise 3: Forgot Password Workflow**

**Objective**: Validate the "Forgot Password" functionality by submitting an email and verifying the resulting message.

**Concepts**: Element interaction, text validation, and handling a basic user flow.

#### **⚠️ Note**: This test cannot be successfully completed as intended at the moment due to an "Internal Server Error" appearing on the site after submission. Following the original requirements, the application should redirect to a confirmation page displaying "Your e-mail's been sent!".
#### In this Playwright implementation, I have also opted to validate the presence of the "Internal Server Error" message. This approach avoids a test timeout (Playwright's equivalent of a `NoSuchElementException`) and serves as a monitoring tool: the test will "fail" once the developers fix the site, alerting me to update the assertion to the correct success message.

### **Exercise 4: Hover Interactions**

**Objective**: Reveal and validate hidden captions by hovering over user profiles across different browser engines.

**Concepts**: `hover()`, Scoped Locators, and Browser Engine Debugging.

#### 🛠️ Challenges & Solutions
* **Static vs. Dynamic Locators:** Initially, using `locator.all()` caused the test to fail because it captured a snapshot of the page before navigation was complete. Switching to `locator.nth()` allowed Playwright’s auto-waiting logic to handle the page transition properly.

* **The "Firefox/Webkit" Hurdle:** Webkit struggled to "paint" the hidden caption fast enough, requiring a more assertive hover.

    * **Firefox** tended to retain pointer focus on the first element, preventing subsequent hovers.

    * **Solution:** I implemented `hover({ force: true })` which forced the virtual cursor to move and trigger the necessary state changes across all engines (Chromium, Firefox, and Webkit).

### **Exercise 5: Data-Driven Keyboard Events**

**Objective:** Simulate a variety of keyboard inputs and validate that the UI correctly captures and displays the event feedback.

**Concepts:** `locator.press()`, `page.keyboard`, **Data-Driven Testing**, and **Event Loop Management**.

#### 🛠️ Challenges & Solutions
* **The "Focus" Requirement:** I initially found that global keyboard commands were inconsistent in Firefox and Webkit. By explicitly using `inputField.focus()` before the press, I ensured the browser context was correctly focused, which is a requirement for hardware-level event dispatching in stricter engines.
* **Default Browser Behaviors:** Testing the `Enter` key revealed a "race condition" where the site would attempt a form submission and refresh the page, causing the result message to disappear instantly.
* **Data-Driven Strategy:** Instead of writing individual tests for every key, I implemented a loop to iterate through an array of keys (*Shift, Control, Escape, Backspace*). This approach increased my test coverage while keeping the codebase DRY.

#### 🚀 Technical Implementation
* **Locators:** Utilized `page.getByText(/You entered:/)` to create a resilient locator that ignores minor HTML structure changes but focuses on the content the user sees.
* **Assertions:** Switched to `toHaveText()` to take advantage of Playwright's built-in retry logic, ensuring the test waits for the UI to update before declaring a pass/fail.

### **Exercise 6: Horizontal Slider & UI Synchronization**

**Objective:** Navigate a slider component to a specific value (*max value of 5*) and verify the numeric output.

**Concepts:** `toPass()`, **Polling Logic**, **Race Conditions**, and **Accessibility Roles**.

### 🛠️ Challenges & Solutions

* **The "Overshoot" Problem:** Initially, using a standard loop caused the test to "outrun" the browser. The automation would send five `ArrowRight` presses before the browser had finished rendering the first two, leading to inconsistent results (e.g., landing on 3.5 instead of 2.5).

* **Syncing State without Hard Waits:** To avoid the "code smell" of `waitForTimeout`, I implemented Playwright’s `toPass()` utility.

* **Solution:** I created a retry block that continually presses the arrow key and checks the current value. If the value doesn't match the target, it throws a temporary error, triggering a retry. This ensures the test moves as fast as the browser allows without ever losing synchronization.

#### 🚀 Technical Implementation
* **Locator Strategy:** Used `page.getByRole('slider')` to interact with the input and `page.locator('#range')` to read the updated text state.

* **Resilience:** By setting a custom `interval` and `timeout` within `toPass`, the test is shielded from environmental lag or slow "paints" in CI environments like GitHub Actions.

### **Exercise 7: JavaScript Alerts, Confirms, and Prompts**

**Objective:** Automate native browser dialogs and verify their impact on the page state.

**Concepts:** `page.on('dialog')`, `dialog.accept()`, and **Asynchronous Event Handling**.

#### 🛠️ Challenges & Solutions

* **The Interception Timing:** I learned that Dialogs in Playwright are handled via the Chrome DevTools Protocol (CDP). This means the listener must be set up before the trigger click.
* **The "Invisible" Dialog Phenomenon:** I initially questioned why dialogs didn't appear in the test videos and tracer. I discovered that Playwright handles these at such a high speed that they are often resolved before the browser can even render the UI for a single frame.