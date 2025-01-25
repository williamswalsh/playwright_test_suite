# Useful functions for Playwright

```javascript
// Taking a screenshot
await page.screenshot({ path: "fullpage.png", fullPage: true });

// Taking a screenshot of a specific element
const element = await page.locator("h1"); // Target an element
await element.screenshot({ path: "element.png" });

// Hide Elements Before Taking a Screenshot
// Hide certain elements like ads or popups:
await page.addStyleTag({ content: ".popup { display: none !important; }" });
await page.screenshot({ path: "cleaned_screenshot.png" });

// Could assert the value of the screenshot is equal to a previous state.
// If you want the page to look identical
// Page cursor inside MFA code field is blinking so screen is changing and will lead to a brittle tests.
const base64Screenshot = await page.screenshot({ encoding: "base64" });
console.log(base64Screenshot);

// Clipped screenshot
await page.screenshot({
  path: "clipped.png",
  clip: { x: 0, y: 0, width: 500, height: 500 }, // Define the region
});

// Locate multiple web elements
const elems = await page.$$(locator); // [] | a, b, c

// wait for elements to all appear
page.waitForSelector("a");
```

# Expect

```

await expect(page.getByTitle('Issues count')).toHaveText('25 issues');
```
