# Weel Playwright Test Suite

### Execution steps

```shell
# Install node
brew install node

# Check node installation was successful
node -v

# Execute all playwright tests in "tests" sub-directory
npx playwright test

# Execute the tests in a specific file - tests/example.spec.js
npx playwright test example

# Starts the interactive UI mode
npx playwright test --ui

# Runs the tests only on the chromium browser
npx playwright test --project=chromium


# Runs the tests in debug mode - opens playwright inspector window
npx playwright test --debug --project=chromium

- ./tests/example.spec.js - Example end-to-end test
- ./tests-examples/demo-todo-app.spec.js - Demo Todo App end-to-end tests
- ./playwright.config.js - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information.

```
