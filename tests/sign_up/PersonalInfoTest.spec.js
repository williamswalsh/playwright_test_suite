"use strict";
import { test, expect } from "@playwright/test";
import { COMMON_SPECIAL_CHARACTERS } from "../utils/constants.js";
import { getTodaysDate, getTomorrowsDate } from "../utils/DateUtils.js";
import invalid_dates from "../../test_data/invalid_dates.json";
import { PersonalInfoPage } from "../../pages/PersonalInfoPage.js";
import { SignUpPage } from "../../pages/SignUpPage.js";

const VERY_LONG_LAST_NAME =
  "abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij";

let personalInfoPage;
let signUpPage;
test.beforeEach(async ({ page }) => {
  signUpPage = new SignUpPage(page);
  personalInfoPage = new PersonalInfoPage(page);

  await signUpPage.goto();
  await signUpPage.fillAndSubmitValidSignupForm();

  // Verify that you are on the personal info page.
  await expect(page).toHaveTitle("Weel");
  await expect(page).toHaveURL("/app/personal-info");
});

test("If missing First name a warning should be visable.", async ({ page }) => {
  await personalInfoPage.clickFirstNameField();
  //   Click page to click off field and activate the error message.
  await personalInfoPage.clickBodyArea();

  await personalInfoPage.assertFirstNameBlankErrorIsVisible();
});

test("If missing last name a warning should be visable.", async ({ page }) => {
  await personalInfoPage.clickLastNameField();
  await personalInfoPage.clickBodyArea();

  await personalInfoPage.assertLastNameBlankErrorIsVisible();
});

test("If missing phone number a warning should be visable.", async ({
  page,
}) => {
  await personalInfoPage.clickPhoneNumberField();
  await personalInfoPage.clickBodyArea();

  await personalInfoPage.assertMobileNumberBlankErrorIsVisible();
});

test("If missing day of birth a warning should be visable.", async ({
  page,
}) => {
  await personalInfoPage.clickDOBDayField();
  await personalInfoPage.clickBodyArea();

  await personalInfoPage.assertInvalidDOBErrorIsVisible();
});

test("If missing month of birth a warning should be visable.", async () => {
  await personalInfoPage.clickDOBMonthField();
  await personalInfoPage.clickBodyArea();

  await personalInfoPage.assertInvalidDOBErrorIsVisible();
});

test("If missing year of birth a warning should be visable.", async () => {
  await personalInfoPage.clickDOBYearField();
  await personalInfoPage.clickBodyArea();

  await personalInfoPage.assertInvalidDOBErrorIsVisible();
});

test("Check if submit button is disabled if all fields are filled except one.", async () => {
  // Fill all fields with valid values
  await personalInfoPage.fillForm(
    "William",
    "Walsh",
    "AU",
    "0423444444",
    "26",
    "10",
    "1980"
  );

  //   Remove value from one field
  await personalInfoPage.fillFirstNameField("");
  //   Test button is disabled
  await personalInfoPage.assertSubmitBtnIsDisabled();
  //   Then re-add value
  await personalInfoPage.fillFirstNameField("William");

  await personalInfoPage.fillLastNameField("");
  await personalInfoPage.assertSubmitBtnIsDisabled();
  await personalInfoPage.fillLastNameField("Walsh");

  await personalInfoPage.fillPhoneNumberField("");
  await personalInfoPage.assertSubmitBtnIsDisabled();
  await personalInfoPage.fillPhoneNumberField("0423444444");

  await personalInfoPage.fillDOBDayField("");
  await personalInfoPage.assertSubmitBtnIsDisabled();
  await personalInfoPage.fillDOBDayField("26");

  await personalInfoPage.fillDOBMonthField("");
  await personalInfoPage.assertSubmitBtnIsDisabled();
  await personalInfoPage.fillDOBMonthField("11");

  await personalInfoPage.fillDOBYearField("");
  await personalInfoPage.assertSubmitBtnIsDisabled();
  await personalInfoPage.fillDOBYearField("1990");

  //   Assert that the button is enabled once all fields are filled.
  await personalInfoPage.assertSubmitBtnIsEnabled();
});

test("First name field limits the amount of characters to 20.", async () => {
  await personalInfoPage.fillFirstNameField("longerThanTwentyCharacterLimit");
  const text = await personalInfoPage.getFirstNameFieldValue();

  expect(text).toBe("longerThanTwentyChar");
});

test("First name field rejects numbers", async ({ page }) => {
  await personalInfoPage.fillFirstNameField("0123456789");
  const text = await personalInfoPage.getFirstNameFieldValue();

  expect(text).toBe("");
});

test("First name field rejects whitespace", async () => {
  const tabAndSpaceCharacters = "    ";
  await personalInfoPage.fillFirstNameField(tabAndSpaceCharacters);
  const text = await personalInfoPage.getFirstNameFieldValue();

  expect(text).toBe("");
});

test("First name field rejects common special characters, except hyphens '-' & single quotes''' .", async () => {
  // Done in batches of 20 characters due to character limit of 20.
  await personalInfoPage.fillFirstNameField("!@£#$%^&*()-='±§_+[]");
  let text = await personalInfoPage.getFirstNameFieldValue();
  expect(text).toBe("-'");

  await personalInfoPage.fillFirstNameField(';.,./{}:"|<>?');
  text = await personalInfoPage.getFirstNameFieldValue();
  expect(text).toBe("");
});

// TODO: Flag this to Frontend developers to limit the number of character to what the backend is enforcing(server side validation).
test("Last name field will not limit the amount of characters.", async () => {
  await personalInfoPage.fillLastNameField(VERY_LONG_LAST_NAME);
  const text = await personalInfoPage.getLastNameFieldValue();

  expect(text).toBe(VERY_LONG_LAST_NAME);
});

// TODO: Flag this to Frontend developers to limit the special characters to what the backend is enforcing(server side validation).
// When form is submitted backend rejects the input value with response:
// "last_name": ["This value does not match the required pattern."]
test("Last name field accepts numbers", async ({ page }) => {
  await personalInfoPage.fillLastNameField("0123456789");
  const text = await personalInfoPage.getLastNameFieldValue();

  expect(text).toBe("0123456789");
});

// TODO: Flag to Frontend developers you can submit the data, it gets rejected on server side -> no errors on the UI.
// Frontend should show error when field is whitespace only.
// Users will be confused if they do this, as unrealistic as it is.
// The user could have just 1 name and submit that into firstname field.
test("Last name field accepts whitespace", async () => {
  const tabAndSpaceCharacters = "    ";
  await personalInfoPage.fillLastNameField(tabAndSpaceCharacters);
  const text = await personalInfoPage.getLastNameFieldValue();

  expect(text).toBe(tabAndSpaceCharacters);
});

test("Last name field accepts whitespace and valid chars", async () => {
  const tabAndSpaceAndValidCharacter = "    p";
  await personalInfoPage.fillLastNameField(tabAndSpaceAndValidCharacter);
  const text = await personalInfoPage.getLastNameFieldValue();

  expect(text).toBe(tabAndSpaceAndValidCharacter);
});

// TODO: Flag this to Frontend developers to limit the special character to what the backend is enforcing(server side validation).
// When form is submitted backend rejects the input value:
// "last_name": ["This value does not match the required pattern."]
test("Last name field accepts common special characters.", async ({ page }) => {
  await personalInfoPage.fillLastNameField(COMMON_SPECIAL_CHARACTERS);
  const text = await personalInfoPage.getLastNameFieldValue();

  expect(text).toBe(COMMON_SPECIAL_CHARACTERS);
});

test("Phone number field should show error when phone number of incorrect length is entered.", async () => {
  await personalInfoPage.selectCountryCodeOption("AU");
  await personalInfoPage.fillPhoneNumberField("01");
  await personalInfoPage.clickBodyArea();

  await personalInfoPage.assertIncorrectNumberForCountryErrorVisible();
});

// TODO: Check how they understand that a phone number is valid for a specific country?
test("Phone number field should show error when phone number of correct length but an invalid number(for specific country).", async () => {
  await personalInfoPage.selectCountryCodeOption("AU");
  await personalInfoPage.fillPhoneNumberField("0123456789");
  await personalInfoPage.clickBodyArea();

  await personalInfoPage.assertIncorrectNumberForCountryErrorVisible();
});

test("Phone number field rejects letter", async ({ page }) => {
  await personalInfoPage.fillPhoneNumberField("abcdefghijklmnopqrstuvwxyz");
  const phoneNumber = await personalInfoPage.getPhoneNumberField();

  expect(phoneNumber).toBe("");
});

test("Phone number field rejects whitespace", async ({ page }) => {
  const tabAndSpaceCharacters = "    ";
  await personalInfoPage.fillPhoneNumberField(tabAndSpaceCharacters);
  const phoneNumber = await personalInfoPage.getPhoneNumberField();

  expect(phoneNumber).toBe("");
});

test("Phone number field rejects common special characters, except the plus character '+'.", async () => {
  await personalInfoPage.fillPhoneNumberField(COMMON_SPECIAL_CHARACTERS);
  const phoneNumber = await personalInfoPage.getPhoneNumberField();

  expect(phoneNumber).toBe("+");
});

test("Phone number field accepts the plus character '+' infront of a valid number.", async () => {
  await personalInfoPage.fillPhoneNumberField("+61423444444");
  const phoneNumber = await personalInfoPage.getPhoneNumberField();

  expect(phoneNumber).toBe("+61 423 444 444");
});

test("Phone number field strips any plus characters '+' if they are not at the beginning of the number.", async () => {
  await personalInfoPage.fillPhoneNumberField("+61423+444444");
  const phoneNumber = await personalInfoPage.getPhoneNumberField();

  expect(phoneNumber).toBe("+61 423 444 444");
});

/**
 * This parameterised test reads data from a json file which contains input data and the expected error messages.
 * I originally stored the json object in the test file but it made the test file overly verbose.
 */
invalid_dates.forEach((data) => {
  test(`Tests with: ${data.day}-${data.monthNum}-${data.year}. Date is invalid because: ${data.reason}`, async () => {
    await personalInfoPage.fillDOBDayField(`${data.day}`);
    await personalInfoPage.fillDOBMonthField(`${data.monthNum}`);
    await personalInfoPage.fillDOBYearField(`${data.year}`);

    await personalInfoPage.assertErrorIsVisible(data.expectedError);
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

// TODO: test fails intermittently.
// when running by itself -> it passes
// when running with other tests -> it fails
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

test("Happy path", async ({ page }) => {
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
  await personalInfoPage.clearCookies();
  await signUpPage.clearCookies();
  await personalInfoPage.close();
  await signUpPage.close();
});
