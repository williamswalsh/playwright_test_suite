import { expect } from "@playwright/test";

export class BusinessSignUpPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.locator("#username"); // Replace with actual selector
    this.emailField = page.locator("#email");
    this.passwordField = page.locator("#password");
    this.confirmPasswordField = page.locator("#confirmPassword");
    this.signupButton = page.locator("#signup-button");
    this.successMessage = page.locator(".success-message");
    this.errorMessage = page.locator(".error-message");
  }

  async goto() {
    await this.page.goto(
      "https://app-moccona.letsweel.com/app/business-signup"
    );
  }

  async fillSignupForm(username, email, password, confirmPassword) {
    await this.usernameField.fill(username);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(confirmPassword);
  }

  async submitForm() {
    await this.signupButton.click();
  }

  async assertSuccessMessage(expectedText) {
    await expect(this.successMessage).toHaveText(expectedText);
  }

  async assertErrorMessage(expectedText) {
    await expect(this.errorMessage).toHaveText(expectedText);
  }
}
