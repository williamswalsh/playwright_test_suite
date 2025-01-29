import { expect } from "@playwright/test";
import { randomUUIDWorkEmail } from "../tests/utils/Randomize";

export class SignUpPage {
  constructor(page) {
    this.page = page;
    this.emailField = this.page.getByTestId("registration-email");
    this.submitBtn = this.page.getByTestId("submit-button");
    this.passwordField = this.page.getByTestId("registration-password");
    this.termsCheckbox = this.page.getByTestId("registration-terms");
    this.signUpBtn = this.page.getByTestId("email-sign-up");
    this.emailAlreadyRegisteredError = this.page
      .getByTestId("registration-email-subtext-container")
      .locator("span")
      .getByText("This account already exists.");
    this.nonWorkEmailErrorMessage = this.page
      .getByTestId("form-input-wrapper-error-text")
      .getByText("Please try again with your work email address");
    this.emailBlankErrorMessage = this.page
      .getByTestId("form-input-wrapper-error-text")
      .getByText("Please enter an email address.");
    this.loginToContinueLink = this.page.getByTestId("login-to-continue-link");

    this.redHexCode = "#D13B15";
  }

  async goto() {
    await this.page.goto(
      "https://app-moccona.letsweel.com/app/business-signup"
    );
  }

  async clearCookies() {
    await this.page.context().clearCookies();
  }

  async fillSignupForm(email, password, checked) {
    await this.emailField.fill(email);
    await this.submitBtn.click();

    await this.passwordField.fill(password);
    if (await checked) {
      await this.termsCheckbox.check();
    }
  }

  async fillAndSubmitSignupForm(email, password, checked) {
    await this.emailField.fill(email);
    await this.submitBtn.click();

    await this.passwordField.fill(password);
    if (await checked) {
      await this.termsCheckbox.check();
    }
    await this.signUpBtn.click();
  }

  async fillAndSubmitValidSignupForm() {
    await this.emailField.fill(randomUUIDWorkEmail());
    await this.submitBtn.click();
    await this.passwordField.fill("Password1!");
    await this.termsCheckbox.check();
    await this.signUpBtn.click();
  }

  async submitForm() {
    await this.signUpBtn.click();
  }
  async isAccountAlreadyRegisteredErrorVisible() {
    return await this.emailAlreadyRegisteredError.isVisible();
  }

  async assertLoginToContinueLinkIsVisible() {
    await expect(this.loginToContinueLink).toBeVisible();
  }

  async assertNonWorkEmailMessage() {
    await expect(this.nonWorkEmailErrorMessage).toBeVisible();
  }

  async assertEmailBlankErrorMessageIsVisible() {
    await expect(this.emailBlankErrorMessage).toBeVisible();
  }

  async assertSignUpBtnDisabled() {
    await expect(this.signUpBtn).toBeDisabled();
  }

  async assertErrorTextIsRed(errorText) {
    await expect(this.page.getByText(errorText)).toHaveAttribute(
      "color",
      this.redHexCode
    );
  }

  async close() {
    await this.page.close();
  }
}
