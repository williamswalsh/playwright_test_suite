"use strict";
import { test, expect } from "@playwright/test";

// TODO: generate unique email using sequential numbers?

test("Happy Path", async ({ page }) => {
  await page.goto("https://app-moccona.letsweel.com/app/business-signup");

  await page
    .getByTestId("registration-email")
    .fill("jessica.smith23@example.com");
  await page.getByTestId("submit-button").click();
  await page.getByTestId("registration-password").fill("Password1!");
  await page.getByTestId("registration-terms").click();
  await page.getByTestId("email-sign-up").click();

  await expect(page).toHaveTitle("Weel");
  await expect(page).toHaveURL(
    "https://app-moccona.letsweel.com/app/personal-info"
  );

  //   Debug statement - progress to this point
  //   await page.pause();

  await page.getByTestId("input-first-name").fill("William");
  await page.getByTestId("input-last-name").fill("Walsh");
  await page.selectOption("select.PhoneInputCountrySelect", "AU");

  //   await page.pause();

  //   TODO: Do a failing case for the phone number
  // Helper function: isValidPhoneNumber?
  await page.fill("input.PhoneInputInput", "0423444444");

  //   await page.pause();

  // TODO: Failing case entering non valid numbers like day - 0, 32+, month 0, 13+, year not future year valid values > age restrictions?
  // TODO: Failing case entering non numbers
  // TODO: Failing case entering decimals
  // TODO: Failing case - etc.
  await page.fill('input[name="day"]', "26");
  await page.fill('input[name="month"]', "10");
  await page.fill('input[name="year"]', "1980");

  //   await page.pause();

  await page.getByTestId("next-button").click();

  //
  await page.screenshot({
    path: "../screenshots/mfa_page.png",
    fullPage: true,
  });

  await page.close();

  // TODO: Understand the object hierarchy - chromium->context->page etc..
  //   Should I be constructing those objects
  // how to construct them with cross browser tests?
  // Close the browser
  //   await browser.close();
});
