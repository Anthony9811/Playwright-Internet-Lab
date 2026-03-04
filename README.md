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

**📝Transition Notes**: In Exercise 1, I replaced the Selenium `findElement` and `send keys` approach with Playwright’s `locator` and `fill`. Unlike my Selenium implementation, this version uses **Auto-waiting**, removing the need for manual `WebDriverWait` or `ExpectedConditions` for the login flash message.

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

### **Exercise 8: File Upload & Path Management**

**Objective:** Automate the selection and upload of a local file and verify the website's response.

**Concepts:** `setInputFiles()`, **Node.js Path Module**, and **Test Data Architecture**.

#### 🛠️ Challenges & Solutions
* **The Pathing Trap:** I initially struggled with `__dirname` failing when used inside a POM. I learned that `__dirname` is relative to the *file it is written in*. By moving the path calculation to the test spec and using `path.join(__dirname, '..', 'test-data', 'image.jpg')`, I ensured the test works regardless of which folder the terminal is running from.

* **Selenium vs. Playwright:** Coming from Selenium, I was used to `sendKeys` for uploads. I found `setInputFiles()` to be significantly more reliable because it interacts directly with the browser's input element, bypassing the need to handle OS-native file picker windows which often hang automation.

#### 🚀 Technical Implementation
* **Folder Structure:** Organized the project by creating a `test-data/` folder at the root. This keeps the repository clean and ensures that anyone cloning the project has the necessary files to run the tests immediately.

* **Portable Code:** Used the `path` module to ensure compatibility across different Operating Systems (Windows uses `\`, while Linux/macOS uses `/`).

### **Exercise 9: Entry Ad Modal & State Persistence**

**Objective:** Automate the dismissal of a modal dialog and verify it can be re-enabled and viewed again.

**Concepts:** `toBeVisible()`, `page.context().clearCookies()`, **Modal Interception** and **Session Management**.

#### 🛠️ Challenges & Solutions
* **The Persistence Snag:** The most significant challenge was the modal not reappearing after being "re-enabled." I discovered that "The Internet" site sets a cookie upon dismissal that prevents the ad from firing again in the same session.

* **Solution:** I integrated `await page.context().clearCookies()` into the test flow. This clears the site's "memory" of the previous dismissal, allowing the modal to trigger correctly for the final verification step.

* **Precise Targeting:** To avoid locator ambiguity with body text, I targeted the "Close" button specifically within the `.modal-footer` container using it's class, this is not recommended by the Playwright team, but it was absolutely necessary due to the absence of a more specific locator.

### Exercise 10: Context Menu & Advanced Mouse Actions

**Objective:** Trigger a JavaScript alert by performing a right-click (context menu) action on a specific hot-spot.

**Concepts:** `{ button: 'right' }`, **Event Interception**, and **Mouse Interaction Parameters**.

#### 🛠️ Challenges & Solutions
* **Specific Interaction:** Unlike standard clicks, the context menu on this page only triggers on a `right-click`. I utilized Playwright's `click` options to specify the mouse button, ensuring the action matched real-world user behavior.

* **Combining Concepts:** This exercise required combining the locator strategies from earlier lessons with the dialog handling learned in Exercise 7. This reinforced the idea that many web interactions are "Action -> Event -> Verification" chains.

### Exercise 11: Nested Frames & Deep DOM Access

**Objective:** Navigate through nested `<frame>` structures to verify content in specific layout segments (Left and Bottom).

**Concepts:** `frameLocator()`, **Recursive Chaining**, and **Scoped Locators**.

#### 🛠️ Challenges & Solutions
* **Assertion Scoping:** I initially encountered a TypeScript error when trying to assert text directly on a `FrameLocator`. I learned that assertions must be performed on an actual `Locator` within the frame's context.

* **The Container Trap:** Learned to distinguish between the `<frameset>` layout container and the actual `<frame>` documents that hold content.

* **Chain Management:** Successfully implemented a multi-level chain (`Main -> Top -> Left`) to access deeply nested data without losing execution context.

### Exercise 12: Dynamic Loading & Auto-Waiting
**Objective:** Automate tests for elements that are either hidden via CSS or completely absent from the DOM until a trigger event.
**Concepts:** `toBeVisible()`, **Custom Timeouts**, and **Unified POM Architecture**.

#### 🛠️ Challenges & Solutions
* **The Selenium Paradigm Shift:** In Selenium, I had to choose between `invisibilityOf()` and `visibilityOfElementLocated()` depending on whether the element was hidden or absent. In Playwright, I learned that `toBeVisible()` handles both states by waiting for the element to be both present in the DOM and visually rendered.

* **Handling Long Delays:** The loading bar on this page exceeds the default 5-second timeout. I resolved this by passing a custom `{ timeout: 10000 }` to the assertion, ensuring the test is robust without globally increasing timeouts.

* **POM Optimization:** Instead of creating separate classes for each example, I utilized a single `DynamicLoadingPage` class with parameterized methods, reducing code duplication and improving maintainability.

### Exercise 13: JavaScript Execution & Complex DOM Structures
**Objective:** Automate interactions on JavaScript-heavy pages involving infinite scrolling and deep/large DOM layouts.

**Concepts:** `page.evaluate()`, **Scroll-to-View**, and **Dynamic Element Counting**.

#### 🛠️ Challenges & Solutions
* **Node vs. Browser Context:** I learned that while Playwright is written in TypeScript, triggering a `window.scrollTo` event requires `page.evaluate()` to execute code directly within the browser's execution context.

* **Handling Lazy Loading:** For the Infinite Scroll, I implemented a while loop that monitors paragraph counts. This ensures the test remains synchronized with the backend as new content is lazily injected into the DOM.

* **Automatic Viewport Management:** Instead of using manual JavaScript for the Large & Deep DOM, I leveraged Playwright's `scrollIntoViewIfNeeded()`. This allows for robust interaction with elements that are physically present in the DOM but hidden behind the current scroll position.