# Library Snippet

### Commands

```shell
npx playwright codegen --help

# Output code generation to a file
npx playwright codegen -o <FILE_NAME>
npx playwright codegen --output <FILE_NAME>
npx playwright codegen --target javascript --output <FILE_NAME>

# Generate code from specific browser
npx playwright codegen --browser firefox
```

### Code generation Specific device:

```shell
# Execute test on IPhone 11 device simulator
npx playwright codegen --device "iPhone 11"

# Test generated:
import { test, expect, devices } from '@playwright/test';
test.use({...devices['iPhone 11'],});

test('test', async ({ page }) => {
});


npx playwright codegen --viewport-size "1600,1200"
```

```javascript
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.surfline.com/");
  await page.getByRole("button", { name: "Search" }).click();
  await page
    .getByRole("textbox", { name: "Search spots, regions," })
    .fill("eloura");
  await page
    .getByRole("link", { name: "EloueraAustralia / Sutherland" })
    .click();

  // ---------------------
  await context.close();
  await browser.close();
})();
```

# JS Test Runner

```javascript
import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.surfline.com/");
  await page.getByRole("button", { name: "Search" }).click();
  await page
    .getByRole("textbox", { name: "Search spots, regions," })
    .fill("eloura");
  await page
    .getByRole("link", { name: "EloueraAustralia / Sutherland" })
    .click();
});
```
