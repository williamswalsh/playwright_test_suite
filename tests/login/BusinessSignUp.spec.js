"use strict";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/app/business-signup");
});

test('Email error should appear when email address is not a "work email".', async ({
  page,
}) => {
  await page.getByTestId("registration-email").fill("non.work.email@gmail.com");
  await page.getByTestId("submit-button").click();
  await page.getByTestId("registration-password").fill("Password1!");
  await page.getByTestId("registration-terms").click();
  await page.getByTestId("email-sign-up").click();

  await expect(
    page
      .getByTestId("form-input-wrapper-error-text")
      .getByText("Please try again with your work email address")
  ).toBeVisible();
});

// Test with multiple invalid email addresses
[
  { email: "plainaddress" },
  { email: "#@%^%#$@#$@#.com" },
  { email: "@example.com" },
  { email: "William Walsh <email@example.com>" },
  { email: "<email@example.com>" },
  { email: "email.example.com" },
  { email: "email@example@example.com" },
  { email: ".email@example.com" },
  { email: "email.@example.com" },
  { email: "email..email@example.com" },
  { email: "あいうえお@example.com" },
  { email: "email@example.com (Will Walsh)" },
  { email: "email@example" },
  { email: "email@-example.com" },
].forEach(({ email }) => {
  test(`Test with invalid email ${email}`, async ({ page }) => {
    await page.getByTestId("registration-email").fill(`${email}`);

    await page.getByTestId("submit-button").click();
    await page.getByTestId("registration-password").fill("Password1!");
    await page.getByTestId("registration-terms").click();
    await page.getByTestId("email-sign-up").click();

    await expect(
      page
        .getByTestId("form-input-wrapper-error-text")
        .getByText("Please try again with your work email address")
    ).toBeVisible();
  });
});

test("Email error should appear when email account already exists.", async ({
  page,
}) => {
  await page
    .getByTestId("registration-email")
    .fill("already.created.email@example.com");

  await page.getByTestId("submit-button").click();
  await page.getByTestId("registration-password").fill("Password1!");
  await page.getByTestId("registration-terms").click();
  await page.getByTestId("email-sign-up").click();

  await expect(page.getByTestId("login-to-continue-link")).toBeVisible();
  await expect(
    page
      .getByTestId("registration-email-subtext-container")
      .locator("span")
      .getByText("This account already exists.")
  ).toBeVisible();
});

/**
 * This parameterised test will check the different criteria that is expected of the passwords that should be submitted.
 *
 */
[
  {
    password: "Short1!",
    description:
      "Submit button should be disabled with a password of length less than 8.",
  },
  {
    password: "Password!",
    description:
      "Submit button should be disabled with a password containing no number.",
  },
  {
    password: "Password1",
    description:
      "Submit button should be disabled with a password containing no special character.",
  },
  {
    password: "password1!",
    description:
      "Submit button should be disabled with a password missing uppercase characters.",
  },
  {
    password: "PASSWORD1!",
    description:
      "Submit button should be disabled with a password missing lowercase characters.",
  },
].forEach(({ password, description }) => {
  test(`${description} PASSWORD: ${password}`, async ({ page }) => {
    await page
      .getByTestId("registration-email")
      .fill("work.email.example@work.com");

    await page.getByTestId("submit-button").click();
    await page.getByTestId("registration-password").fill(`${password}`);
    await page.getByTestId("registration-terms").click();

    // Checks for presence of submit button & whether it has the attribute disabled.
    await expect(page.getByTestId("email-sign-up")).toBeDisabled();
  });
});

test("Submit button should be disabled when terms and conditions checkbox hasn't been checked.", async ({
  page,
}) => {
  await page
    .getByTestId("registration-email")
    .fill("work.email.example@work.com");

  await page.getByTestId("submit-button").click();
  await page.getByTestId("registration-password").fill("Password1!");

  await expect(page.getByTestId("email-sign-up")).toBeDisabled();
});

test("User should be redirected to login when browsing directly to personal-info section.", async ({
  page,
}) => {
  await page.goto("/app/personal-info");

  await expect(page).toHaveURL("/app/login");
});

// Each field should show an error message if they are unpopulated
test.only("Work Email field should show an error message if they are unpopulated", async ({
  page,
}) => {
  await page.getByTestId("submit-button").click();

  await expect(
    page
      .getByTestId("form-input-wrapper-error-text")
      .getByText("Please enter an email address.")
  ).toBeVisible();
});

// Each field should show an error message if they are unpopulated
test.only("Password field when empty must show an error message, the text will be red.", async ({
  page,
}) => {
  await page.getByTestId("submit-button").click();

  await expect(
    page
      .getByTestId("form-input-wrapper-error-text")
      .getByText("Please enter an email address.")
  ).toBeVisible();
});

test("Happy Path", async ({ page }) => {
  await page
    .getByTestId("registration-email")
    .fill("jessica.smith24@example.com");
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

  await page.screenshot({
    path: "../screenshots/mfa_page.png",
    fullPage: true,
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
});
