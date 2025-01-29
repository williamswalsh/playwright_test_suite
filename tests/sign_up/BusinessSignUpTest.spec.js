"use strict";
import { test, expect } from "@playwright/test";
import { randomUUIDWorkEmail } from "../utils/Randomize.js";
import { SignUpPage } from "../../pages/SignUpPage.js";
import { PersonalInfoPage } from "../../pages/PersonalInfoPage.js";

let signUpPage;

test.beforeEach(async ({ page }) => {
  signUpPage = new SignUpPage(page);
  await signUpPage.goto();
});

// TODO: Investigate - Test is failing if setting the fullyParallel flag to true.
// Fails with expect.toHaveTitle with timeout 5000ms
// Expected string: "Weel"
// Received string: "Sign up for a free trial | Weel"
/**
 * The user should be able to enter a work email and valid password before pressing “Sign up with email”
 * and navigating to the personal-info page.
 */
test("Successful Sign up", async ({ page }) => {
  await signUpPage.fillAndSubmitSignupForm(
    randomUUIDWorkEmail(),
    "Password1!",
    true
  );

  // TODO: there should be a better way of doing this.
  await expect(page).toHaveTitle("Weel");
  await expect(page).toHaveURL("/app/personal-info");

  await page.screenshot({
    path: "tests/screenshots/personal_info.png",
    fullPage: true,
  });
});

// A work email is an email that does not have the personal email domains gmail, hotmail etc. e.g. john@work.com
test('Email error should appear when email address is not a "work email".', async () => {
  await signUpPage.fillAndSubmitSignupForm(
    "non.work.email@gmail.com",
    "Password1!",
    true
  );

  await signUpPage.assertNonWorkEmailMessage();
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
  test(`Test with invalid email ${email}`, async () => {
    await signUpPage.fillAndSubmitSignupForm(`${email}`, "Password1!", true);

    await signUpPage.assertNonWorkEmailMessage();
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
  test(`${description} PASSWORD: ${password}`, async () => {
    const validWorkEmail = "work.email.example@work.com";

    await signUpPage.fillSignupForm(validWorkEmail, `${password}`, true);

    // Checks for presence of submit button & whether it has the attribute disabled.
    await signUpPage.assertSignUpBtnDisabled();
  });
});

test("Email error should appear when email account already exists.", async () => {
  await signUpPage.fillAndSubmitSignupForm(
    "already.created.email@work.com",
    "Password1!",
    true
  );

  if (await signUpPage.isAccountAlreadyRegisteredErrorVisible()) {
    // Test success: Email is already registered -> error already present -> can exit test here.
    // Assert if link is also visible:
    await signUpPage.assertLoginToContinueLinkIsVisible();
    return;
  }

  // Clear cookie to allow navigation back to the signup page.
  await signUpPage.clearCookies();
  // Email is not registered -> will reregister the email and check for the duplicate email error.
  await signUpPage.goto();
  await signUpPage.fillAndSubmitSignupForm(
    "already.created.email@work.com",
    "Password1!",
    true
  );

  await signUpPage.assertLoginToContinueLinkIsVisible();
  await signUpPage.isAccountAlreadyRegisteredErrorVisible();
});

test("Submit button should be disabled when terms and conditions checkbox hasn't been checked.", async () => {
  await signUpPage.fillSignupForm(randomUUIDWorkEmail(), "Password1!", false);

  await signUpPage.assertSignUpBtnDisabled();
});

// Each field should show an error message if they are unpopulated
test("Work Email field should show an error message if it is unpopulated", async ({
  page,
}) => {
  await signUpPage.submitBtn.click();

  await signUpPage.assertEmailBlankErrorMessageIsVisible();
});

// Each field should show an error message if they are unpopulated
test("Password field when empty must show an error message, the text will be red.", async ({
  page,
}) => {
  await signUpPage.fillSignupForm(`${randomUUIDWorkEmail()}`, "", true);

  await signUpPage.assertErrorTextIsRed("at least 8 characters");
  await signUpPage.assertErrorTextIsRed("a number");
  await signUpPage.assertErrorTextIsRed("a special character");
  await signUpPage.assertErrorTextIsRed("upper and lower case");
});

test.afterEach(async ({ page }) => {
  await signUpPage.clearCookies();
  await signUpPage.close();
});
