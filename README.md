<!-- TABLE OF CONTENTS -->
<h2>
    <details open="open">
        <summary class="normal">Table of Contents</summary>
        <h5>
          <ol>
            <li>
              <a href="#about-the-project">About the Project</a>
              <ul>
                <li><a href="#architecture-overview">Architecture Overview</a></li>
                <li><a href="#built-with">Built With</a></li>
              </ul>
            </li>
            <li>
              <a href="#getting-started">Getting Started</a>
              <ul>
                <li><a href="#prerequisites">Prerequisites</a></li>
                <li><a href="#installation">Installation</a></li>
              </ul>
            </li>
            <li><a href="#usage">Usage</a></li>
            <li><a href="#reports">Reports</a></li>
          </ol>
        </h5>    
    </details>
</h2>

<!-- ABOUT THE PROJECT -->

# About the Project
Advantage Online Shopping - Automation Framework
This repository contains a high-level automated testing framework for the Advantage Online Shopping e-commerce platform. It leverages Playwright with TypeScript, utilizing a Fluent Workflow Architecture to ensure tests are readable, maintainable, and scalable.

## Architecture Overview

The project follows a Task-Based Page Object Model, separating concerns across four layers:

- Tests (/tests): High-level test scenarios using test.step.

- Workflows (/workflows): Orchestrates multiple page actions into single reusable tasks (e.g., completePaymentAndVerify).

- Page Object Model (/pages): Encapsulates locators and atomic interactions.

- Data (/data): Centralized storage for user credentials and test constants.

## Built With

- [Playwright](https://playwright.dev)
- [Typescript](https://www.typescriptlang.org/)
- [Faker.js](https://fakerjs.dev/)


# Getting Started

## Prerequisites
- Node.js: v18.0.0 or higher, Download and Install Node JS from
    ```sh
    https://nodejs.org/en/download/
    ```
- npm: v9.0.0 or higher, check version using command:
    ```sh
    npm -v
    ```

## Installation

1. Clone the [Advantage-Shopping-Playwright-Automation](https://github.com/arunshaju001/Advantage-Shopping-Playwright-Automation-Mozilor-Demo) repository:
   ```sh
   git clone https://github.com/arunshaju001/Advantage-Shopping-Playwright-Automation-Mozilor-Demo.git
   ```
2. Navigate to folder:
    ```sh
    cd Advantage-Shopping-Playwright-Automation-Mozilor-Demo
    ```
3. Install npm packages using:
    ```sh
    npm install
    ```
4. For first time installation run below command to download required browsers
    ```sh
    npx playwright install
    ```

<!-- USAGE EXAMPLES-->

# Usage

1. For Browser Configuration, change required parameters in `playwright.config.ts`.
2. For execution of entire test suite on all available browsers simultaneously execute below command, `Test Cases are present in "tests" folder`:
    ```JS
    npx playwright test
    ```
3. To execute only the smoke test suite:
    ```JS
    npx playwright test -g "@smoke"
    ```
4. To run tests in Headed mode (useful for visually debugging the browser interactions):
    ```JS
    npx playwright test --headed
    ```
5. To run a specific test file only:
    ```JS
    npx playwright test tests/checkout.spec.ts
    ```
6. To run tests on a specific browser project (as defined in your playwright.config.ts):
    ```JS
    npx playwright test --project=chromium
    ```
7. To debug a test step-by-step using the Playwright Inspector:
    ```JS
    npx playwright test --debug
    ```
8. To run tests and force a specific number of workers:
    ```JS
    npx playwright test --workers=1
    ```
9. To generate and open the HTML report after the test execution completes:
    ```JS
    npx playwright show-report
    ```

# Reports

- <b>Overall Report</b>
  ![Overall Report Screenshot][overall-report-screenshot]

- <b>Detailed Report</b>
  ![Detailed Report Screenshot][detailed-report-screenshot]

- <b>Failure Report</b>
  ![Failure Report Screenshot][failure-report-screenshot]

<!-- MARKDOWN LINKS & IMAGES -->

[overall-report-screenshot]: Images/OverallReport.png
[detailed-report-screenshot]:Images/DetailedReport.png
[failure-report-screenshot]: Images/FailureReport.png