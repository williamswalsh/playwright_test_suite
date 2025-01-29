"use strict";
import { test, expect } from "@playwright/test";
import { randomWorkEmail } from "../utils/Randomize.js";
import { COMMON_SPECIAL_CHARACTERS } from "../utils/constants.js";
import { getTodaysDate, getTomorrowsDate } from "../utils/DateUtils.js";
import invalid_dates from "../../test_data/invalid_dates.json";

const VERY_LONG_LAST_NAME =
  "abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij";

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

test("First name field limits the amount of characters to 20.", async ({
  page,
}) => {
  await page
    .getByTestId("input-first-name")
    .fill("longerThanTwentyCharacterLimit");
  const text = await page.getByTestId("input-first-name").inputValue();

  expect(text).toBe("longerThanTwentyChar");
});

test("First name field rejects numbers", async ({ page }) => {
  await page.getByTestId("input-first-name").fill("0123456789");
  let text = await page.getByTestId("input-first-name").inputValue();
  expect(text).toBe("");
});

test("First name field rejects whitespace", async ({ page }) => {
  const tabAndSpaceCharacters = "    ";
  await page.getByTestId("input-first-name").fill(tabAndSpaceCharacters);
  let text = await page.getByTestId("input-first-name").inputValue();
  expect(text).toBe("");
});

test("First name field rejects common special characters, except hyphens '-' & single quotes''' .", async ({
  page,
}) => {
  // Done in batches of 20 characters due to character limit of 20.
  await page.getByTestId("input-first-name").fill("!@£#$%^&*()-='±§_+[]");
  let text = await page.getByTestId("input-first-name").inputValue();
  expect(text).toBe("-'");

  await page.getByTestId("input-first-name").fill(';.,./{}:"|<>?');
  text = await page.getByTestId("input-first-name").inputValue();
  expect(text).toBe("");
});

// TODO: Flag this to Frontend developers to limit the number of character to what the backend is enforcing(server side validation).
test("Last name field will not limit the amount of characters.", async ({
  page,
}) => {
  await page.getByTestId("input-last-name").fill(VERY_LONG_LAST_NAME);
  const text = await page.getByTestId("input-last-name").inputValue();

  expect(text).toBe(VERY_LONG_LAST_NAME);
});

// TODO: Flag this to Frontend developers to limit the special characters to what the backend is enforcing(server side validation).
// When form is submitted backend rejects the input value with response:
// "last_name": ["This value does not match the required pattern."]
test("Last name field accepts numbers", async ({ page }) => {
  await page.getByTestId("input-last-name").fill("0123456789");
  let text = await page.getByTestId("input-last-name").inputValue();
  expect(text).toBe("0123456789");
});

// TODO: Flag to Frontend developers you can submit the data, it gets rejected on server side -> no errors on the UI.
// Frontend should show error when field is whitespace only.
// Users will be confused if they do this, as unrealistic as it is.
// The user could have just 1 name and submit that into firstname field.
test("Last name field accepts whitespace", async ({ page }) => {
  const tabAndSpaceCharacters = "    ";
  await page.getByTestId("input-last-name").fill(tabAndSpaceCharacters);
  let text = await page.getByTestId("input-last-name").inputValue();
  expect(text).toBe(tabAndSpaceCharacters);
});

test("Last name field accepts whitespace and valid chars", async ({ page }) => {
  const tabAndSpaceAndValidCharacter = "    p";
  await page.getByTestId("input-last-name").fill(tabAndSpaceAndValidCharacter);
  let text = await page.getByTestId("input-last-name").inputValue();
  expect(text).toBe(tabAndSpaceAndValidCharacter);
});

// TODO: Flag this to Frontend developers to limit the special character to what the backend is enforcing(server side validation).
// When form is submitted backend rejects the input value:
// "last_name": ["This value does not match the required pattern."]
test("Last name field accepts common special characters.", async ({ page }) => {
  await page.getByTestId("input-last-name").fill(COMMON_SPECIAL_CHARACTERS);
  let text = await page.getByTestId("input-last-name").inputValue();
  expect(text).toBe(COMMON_SPECIAL_CHARACTERS);
});

test("Phone number field should show error when phone number of incorrect length is entered.", async ({
  page,
}) => {
  await page.selectOption("select.PhoneInputCountrySelect", "AU");
  await page.fill("input.PhoneInputInput", "01");
  await page.mouse.click(0, 0);

  await expect(
    page.getByText("Incorrect number for selected country - try again.")
  ).toBeVisible();
});

// TODO: Check how they understand that a phone number is valid for a specific country?
test("Phone number field should show error when phone number of correct length but an invalid number(for specific country).", async ({
  page,
}) => {
  await page.selectOption("select.PhoneInputCountrySelect", "AU");
  await page.fill("input.PhoneInputInput", "0123456789");
  await page.mouse.click(0, 0);

  await expect(
    page.getByText("Incorrect number for selected country - try again.")
  ).toBeVisible();
});

test("Phone number field rejects letter", async ({ page }) => {
  await page.fill("input.PhoneInputInput", "abcdefghijklmnopqrstuvwxyz");
  let phoneNumber = await page.locator("input.PhoneInputInput").inputValue();

  expect(phoneNumber).toBe("");
});

test("Phone number field rejects whitespace", async ({ page }) => {
  const tabAndSpaceCharacters = "    ";
  await page.fill("input.PhoneInputInput", tabAndSpaceCharacters);
  let phoneNumber = await page.locator("input.PhoneInputInput").inputValue();

  expect(phoneNumber).toBe("");
});

test("Phone number field rejects common special characters, except the plus character '+'.", async ({
  page,
}) => {
  await page.fill("input.PhoneInputInput", COMMON_SPECIAL_CHARACTERS);
  let phoneNumber = await page.locator("input.PhoneInputInput").inputValue();

  expect(phoneNumber).toBe("+");
});

test("Phone number field accepts the plus character '+' infront of a valid number.", async ({
  page,
}) => {
  await page.fill("input.PhoneInputInput", "+61423444444");
  let phoneNumber = await page.locator("input.PhoneInputInput").inputValue();

  expect(phoneNumber).toBe("+61 423 444 444");
});

test("Phone number field strips any plus characters '+' if they are not at the beginning of the number.", async ({
  page,
}) => {
  await page.fill("input.PhoneInputInput", "+61423+444444");
  let phoneNumber = await page.locator("input.PhoneInputInput").inputValue();

  expect(phoneNumber).toBe("+61 423 444 444");
});

/**
 * This parameterised test reads data from a json file which contains input data and the expected error messages.
 * I originally stored the json object in the test file but it made the test file overly verbose.
 */
invalid_dates.forEach((data) => {
  test(`Tests with: ${data.day}-${data.monthNum}-${data.year}. Date is invalid because: ${data.reason}`, async ({
    page,
  }) => {
    await page.fill('input[name="day"]', `${data.day}`);
    await page.fill('input[name="month"]', `${data.monthNum}`);
    await page.fill('input[name="year"]', `${data.year}`);

    await expect(page.getByText(data.expectedError)).toBeVisible();
  });
});

test("Tests with current date. User needs to be 18+.", async ({ page }) => {
  const date = getTodaysDate();

  await page.fill('input[name="day"]', `${date.day}`);
  await page.fill('input[name="month"]', `${date.month}`);
  await page.fill('input[name="year"]', `${date.year}`);

  await expect(
    page.getByText("You must be 18 years or older to use Weel")
  ).toBeVisible();
});

test("Tests with tomorrows date. Cannot have date in future.", async ({
  page,
}) => {
  const date = getTomorrowsDate();

  await page.fill('input[name="day"]', `${date.day}`);
  await page.fill('input[name="month"]', `${date.month}`);
  await page.fill('input[name="year"]', `${date.year}`);

  await expect(
    page.getByText("You must be 18 years or older to use Weel")
  ).toBeVisible();
});

test.only("Happy path", async ({ page }) => {
  await page.getByTestId("input-first-name").fill("William");
  await page.getByTestId("input-last-name").fill("Walsh");
  await page.selectOption("select.PhoneInputCountrySelect", "AU");
  await page.fill("input.PhoneInputInput", "0423444444");

  await page.fill('input[name="day"]', "26");
  await page.fill('input[name="month"]', "10");
  await page.fill('input[name="year"]', "1980");

  await page.getByTestId("next-button").click();

  await page.screenshot({
    path: "tests/screenshots/mfa_code.png",
    fullPage: true,
  });
});

// TODO: DOB: Failing case entering text, decimals, special characters

test.afterEach(async ({ page }) => {
  await page.close();
});
