### steps

```shell
# Install node
brew install node

# Create  a project folder
mkdir <PROJECT_FOLDER_NAME>
mkdir my_special_project

# Change current directory to the project folder
cd <PROJECT_FOLDER_NAME>
cd my_special_project

# Create a Playwright project inside the project folder
npm init playwright@latest

# Check playwright version - can be executed in any directory
npm playwright -v

# Install faker as a development dependency
npm install @faker-js/faker --save-dev
# Usage:
# import { faker } from '@faker-js/faker';
#   const lastName = faker.name.lastName();
#   const email = faker.internet.email();
#   const phoneNumber = faker.phone.number();

# Runs the tests only on the chromium browser
npx playwright test --project=chromium

# Execute the tests in a specific file - tests/example.spec.js
npx playwright test <TEST_SPEC_FILE>
npx playwright test example

# Check the test report that was generated for the last test run.
npx playwright show-report
# A browser window will open with the url: "localhost:9323"
```
