import { expect } from "@playwright/test";

export class PersonalInfoPage {
  constructor(page) {
    this.page = page;
    // this.emailField = page.getByTestId("registration-email");
    // this.submitBtn = page.getByTestId("submit-button");
    // this.passwordField = page.getByTestId("registration-password");
    // this.termsCheckbox = page.getByTestId("registration-terms");
    // this.signUpBtn = page.getByTestId("email-sign-up");
    // this.emailAlreadyRegisteredError = page
    //   .getByTestId("registration-email-subtext-container")
    //   .locator("span")
    //   .getByText("This account already exists.");
    // this.nonWorkEmailErrorMessage = page
    //   .getByTestId("form-input-wrapper-error-text")
    //   .getByText("Please try again with your work email address");
    // // this.errorMessage = page.locator(".error-message");
    // this.loginToContinueLink = page.getByTestId("login-to-continue-link");
  }

  async goto() {
    await this.page.goto("https://app-moccona.letsweel.com/app/personal-info");
  }

  //   async fillSignupForm(email, password, checked) {
  //     await this.emailField.fill(email);
  //     await this.submitBtn.click();

  //     await this.passwordField.fill(password);
  //     if (checked) {
  //       await this.termsCheckbox.check();
  //     }
  //   }

  //   async fillAndSubmitSignupForm(email, password, checked) {
  //     await this.emailField.fill(email);
  //     await this.submitBtn.click();

  //     await this.passwordField.fill(password);
  //     if (checked) {
  //       await this.termsCheckbox.check();
  //     }
  //     await this.signUpBtn.click();
  //   }

  //   async submitForm() {
  //     await this.signUpBtn.click();
  //   }
  //   async isAccountAlreadyRegisteredErrorVisible() {
  //     return this.emailAlreadyRegisteredError.isVisible();
  //   }

  //   async assertLoginToContinueLinkIsVisible() {
  //     await expect(this.loginToContinueLink).toBeVisible();
  //   }

  //   async assertNonWorkEmailMessage() {
  //     await expect(this.nonWorkEmailErrorMessage).toBeVisible();
  //   }

  //   async assertSignUpBtnDisabled() {
  //     await expect(this.signUpBtn).toBeDisabled();
  //   }

  async close() {
    await this.page.close();
  }
}
