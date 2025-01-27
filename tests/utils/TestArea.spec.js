"use strict";
import { test, expect } from "@playwright/test";

test("Print text of all links", async ({ page }) => {
  await page.goto("https://demoblaze.com/index.html");

  // wait for selector
  page.waitForSelector("a");

  const anchorElements = await page.$$("a");
  for (const anchor of anchorElements) {
    const linkText = await anchor.textContent();
    console.log(linkText);
  }
});

test.fail("Failing test demo", async ({ page }) => {
  test.fail();
});

// Test fails expected:
test.only("Submit button should not be clickable when terms and conditions checkbox hasn't been checked.", async ({
  page,
}) => {
  await page
    .getByTestId("registration-email")
    .fill("work.email.example3@work.com");

  await page.getByTestId("submit-button").click();
  await page.getByTestId("registration-password").fill("Password1!");

  page.getByTestId("email-sign-up").click();

  test.fail("Test will fail because sign up button is disabled");
});

test.fail(
  "Submit button should not be clickable when terms and conditions checkbox hasn't been checked.",
  async ({ page }) => {
    await page
      .getByTestId("registration-email")
      .fill("work.email.example3@work.com");

    await page.getByTestId("submit-button").click();
    await page.getByTestId("registration-password").fill("Password1!");

    page.getByTestId("email-sign-up").click();
  }
);
