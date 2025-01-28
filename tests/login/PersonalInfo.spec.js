"use strict";
import { test, expect } from "@playwright/test";
import { randomWorkEmail } from "../utils/Randomize.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/app/business-signup");
  await page.getByTestId("registration-email").fill(`${randomWorkEmail()}`);
  await page.getByTestId("submit-button").click();
  await page.getByTestId("registration-password").fill("Password1!");
  await page.getByTestId("registration-terms").click();
  await page.getByTestId("email-sign-up").click();

  await expect(page).toHaveTitle("Weel");
  await expect(page).toHaveURL("/app/personal-info");
});

test("If missing First name a warning should be visable.", async ({ page }) => {
  await page.getByTestId("input-first-name").click();
  //   Click page to click off field and activate the error message.
  await page.mouse.click(0, 0);
  await expect(page.getByText("Please enter your first name")).toBeVisible();
});

test("If missing last name a warning should be visable.", async ({ page }) => {
  await page.getByTestId("input-last-name").click();
  await page.mouse.click(0, 0);

  await expect(page.getByText("Please enter your last name")).toBeVisible();
});

test("If missing phone number a warning should be visable.", async ({
  page,
}) => {
  await page.click("input.PhoneInputInput");
  await page.mouse.click(0, 0);

  await expect(page.getByText("Please enter your mobile number")).toBeVisible();
});

test("If missing day of birth a warning should be visable.", async ({
  page,
}) => {
  await page.click('input[name="day"]');
  await page.mouse.click(0, 0);

  await expect(
    page.getByText("Please enter a valid date of birth")
  ).toBeVisible();
});

test("If missing month of birth a warning should be visable.", async ({
  page,
}) => {
  await page.click('input[name="month"]');
  await page.mouse.click(0, 0);

  await expect(
    page.getByText("Please enter a valid date of birth")
  ).toBeVisible();
});

test("If missing year of birth a warning should be visable.", async ({
  page,
}) => {
  await page.click('input[name="year"]');
  await page.mouse.click(0, 0);

  await expect(
    page.getByText("Please enter a valid date of birth")
  ).toBeVisible();
});

test("Check if button is disabled if all fields are filled except one.", async ({
  page,
}) => {
  // Fill all fields with valid values
  await page.getByTestId("input-first-name").fill("William");
  await page.getByTestId("input-last-name").fill("Walsh");
  await page.selectOption("select.PhoneInputCountrySelect", "AU");
  await page.fill("input.PhoneInputInput", "0423444444");
  await page.fill('input[name="day"]', "26");
  await page.fill('input[name="month"]', "10");
  await page.fill('input[name="year"]', "1980");

  //   Remove value from one field
  await page.getByTestId("input-first-name").fill("");
  //   Test button is disabled
  await expect(page.getByTestId("next-button")).toBeDisabled();
  //   Then re-add valule
  await page.getByTestId("input-first-name").fill("William");

  await page.getByTestId("input-last-name").fill("");
  await expect(page.getByTestId("next-button")).toBeDisabled();
  await page.getByTestId("input-last-name").fill("Walsh");

  await page.fill("input.PhoneInputInput", "");
  await expect(page.getByTestId("next-button")).toBeDisabled();
  await page.fill("input.PhoneInputInput", "0423444444");

  await page.fill('input[name="day"]', "");
  await expect(page.getByTestId("next-button")).toBeDisabled();
  await page.fill('input[name="day"]', "26");

  await page.fill('input[name="month"]', "");
  await expect(page.getByTestId("next-button")).toBeDisabled();
  await page.fill('input[name="month"]', "10");

  await page.fill('input[name="year"]', "");
  await expect(page.getByTestId("next-button")).toBeDisabled();
  await page.fill('input[name="year"]', "1990");

  //   Assert that the button is enabled once all fields are filled.
  await expect(page.getByTestId("next-button")).toBeEnabled();
});

[
  {
    firstName: "Short1!",
    description:
      "Submit button should be disabled with a firstName of length less than 8.",
  },
  {
    firstName: "Password!",
    description:
      "Submit button should be disabled with a firstName containing no number.",
  },
  {
    firstName: "Password1",
    description:
      "Submit button should be disabled with a firstName containing no special character.",
  },
  {
    firstName: "password1!",
    description:
      "Submit button should be disabled with a firstName missing uppercase characters.",
  },
  {
    firstName: "PASSWORD1!",
    description:
      "Submit button should be disabled with a firstName missing lowercase characters.",
  },
].forEach(({ password, description }) => {
  test.only(`${description} PASSWORD: ${password}`, async ({ page }) => {
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

// First name field
test.only("First name test", async ({ page }) => {
  await page.getByTestId("input-first-name").fill("?");
  let text = await page.getByTestId("input-first-name").inputValue();
  await expect(text).toBe("");

  await page.getByTestId("input-first-name").fill("?");
  let text = await page.getByTestId("input-first-name").inputValue();
  await expect(text).toBe("");

  await page.getByTestId("input-first-name").fill("?");
  let text = await page.getByTestId("input-first-name").inputValue();
  await expect(text).toBe("");

  await page.getByTestId("input-first-name").fill("?");
  let text = await page.getByTestId("input-first-name").inputValue();
  await expect(text).toBe("");
  //   await page.getByTestId("input-last-name").fill("Walsh");
  //   await page.selectOption("select.PhoneInputCountrySelect", "AU");

  //   await page.pause();

  //   TODO: Do a failing case for the phone number
  // Helper function: isValidPhoneNumber?
  await page.fill("input.PhoneInputInput", "0423444444");
});

test("Happy path", async ({ page }) => {
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

  await page.pause();

  await page.getByTestId("next-button").click();

  await page.screenshot({
    path: "tests/screenshots/mfa_code.png",
    fullPage: true,
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
});
