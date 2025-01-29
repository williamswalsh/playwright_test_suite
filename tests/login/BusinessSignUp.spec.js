"use strict";
import { test, expect } from "@playwright/test";
import { randomUUIDWorkEmail } from "../utils/Randomize.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/app/business-signup");
});

// A work email is an email that does not have the personal email domains gmail, hotmail etc. e.g. john@work.com
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

/**
 * This parameterised test will check multiple invalid email addresses.
 */
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

/**
 * This parameterised test will check the different criteria that is expected of the passwords that are submitted.
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

test("Email error should appear when email account already exists.", async ({
  page,
}) => {
  await page
    .getByTestId("registration-email")
    .fill("already.created.email@work.com");

  await page.getByTestId("submit-button").click();
  await page.getByTestId("registration-password").fill("Password1!");
  await page.getByTestId("registration-terms").click();
  await page.getByTestId("email-sign-up").click();

  if (
    page
      .getByTestId("registration-email-subtext-container")
      .locator("span")
      .getByText("This account already exists.")
      .isVisible()
  ) {
    // Test success: Email is already registered -> error already present -> can exit test here.
    await expect(page.getByTestId("login-to-continue-link")).toBeVisible();
    return;
  }

  // Email is not registered -> will reregister the email and check for the duplicate email error.
  await page
    .getByTestId("registration-email")
    .fill("already.created.email@work.com");

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

test("Submit button should be disabled when terms and conditions checkbox hasn't been checked.", async ({
  page,
}) => {
  await page.getByTestId("registration-email").fill(`${randomUUIDWorkEmail()}`);
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
test("Work Email field should show an error message if they are unpopulated", async ({
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
test("Password field when empty must show an error message, the text will be red.", async ({
  page,
}) => {
  await page.getByTestId("registration-email").fill(`${randomUUIDWorkEmail()}`);
  await page.getByTestId("submit-button").click();
  await page.getByTestId("registration-password").click();
  await page.getByTestId("registration-terms").click();

  const redHexCode = "#D13B15";

  await expect(page.getByText("at least 8 characters")).toHaveAttribute(
    "color",
    redHexCode
  );

  await expect(page.getByText("a number")).toHaveAttribute("color", redHexCode);

  await expect(page.getByText("a special character")).toHaveAttribute(
    "color",
    redHexCode
  );

  await expect(page.getByText("upper and lower case")).toHaveAttribute(
    "color",
    redHexCode
  );
});

/**
 * The user should be able to enter a work email and valid password before pressing “Sign up with email”
 * and navigating to the personal-info page.
 */
test("Business Signup success.", async ({ page }) => {
  const workEmail = randomUUIDWorkEmail();
  await page.getByTestId("registration-email").fill(workEmail);
  await page.getByTestId("submit-button").click();
  await page.getByTestId("registration-password").fill("Password1!");
  await page.getByTestId("registration-terms").click();
  await page.getByTestId("email-sign-up").click();

  await expect(page).toHaveTitle("Weel");
  await expect(page).toHaveURL("/app/personal-info");

  await page.screenshot({
    path: "tests/screenshots/personal_info.png",
    fullPage: true,
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
});
