import { expect } from "@playwright/test";

export class PersonalInfoPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = this.page.getByTestId("input-first-name");
    this.lastNameField = this.page.getByTestId("input-last-name");
    this.phoneNumberField = this.page.locator("input.PhoneInputInput");
    this.countryCodeOption = this.page.locator(
      "select.PhoneInputCountrySelect"
    );
    this.dobDayField = this.page.locator('input[name="day"]');
    this.dobMonthField = this.page.locator('input[name="month"]');
    this.dobYearField = this.page.locator('input[name="year"]');

    this.submitBtn = page.getByTestId("next-button");

    this.firstNameErrorMessage = this.page.getByText(
      "Please enter your first name"
    );
    this.lastNameErrorMessage = this.page.getByText(
      "Please enter your last name"
    );
    this.mobileNumberBlankErrorMessage = this.page.getByText(
      "Please enter your mobile number"
    );
    this.dateOfBirthErrorMessage = this.page.getByText(
      "Please enter a valid date of birth"
    );
    this.incorrectNumberForCountry = this.page.getByText(
      "Incorrect number for selected country - try again."
    );
  }

  async goto() {
    await this.page.goto(
      "https://app-moccona.letsweel.com/app/business-signup",
      { waitUntil: "commit" }
    );
  }

  async clickFirstNameField() {
    await this.firstNameField.click();
  }

  async fillFirstNameField(input) {
    await this.firstNameField.fill(input);
  }

  async getFirstNameFieldValue() {
    return await this.firstNameField.inputValue();
  }

  async clickLastNameField() {
    await this.lastNameField.click();
  }

  async fillLastNameField(input) {
    await this.lastNameField.fill(input);
  }

  async getLastNameFieldValue() {
    return await this.lastNameField.inputValue();
  }

  async clickPhoneNumberField() {
    await this.phoneNumberField.click();
  }

  async fillPhoneNumberField(input) {
    await this.phoneNumberField.fill(input);
  }

  async getPhoneNumberField() {
    return await this.phoneNumberField.inputValue();
  }

  async selectCountryCodeOption(countryCode) {
    await this.countryCodeOption.selectOption(countryCode);
  }

  async clickDOBDayField() {
    await this.dobDayField.click();
  }

  async fillDOBDayField(input) {
    await this.dobDayField.fill(input);
  }

  async clickDOBMonthField() {
    await this.dobMonthField.click();
  }
  async fillDOBMonthField(input) {
    await this.dobMonthField.fill(input);
  }

  async clickDOBYearField() {
    await this.dobYearField.click();
  }

  async fillDOBYearField(input) {
    await this.dobYearField.fill(input);
  }

  async clickBodyArea() {
    await this.page.mouse.click(0, 0);
  }

  async assertFirstNameBlankErrorIsVisible() {
    await expect(this.firstNameErrorMessage).toBeVisible();
  }

  async assertLastNameBlankErrorIsVisible() {
    await expect(this.lastNameErrorMessage).toBeVisible();
  }

  async assertMobileNumberBlankErrorIsVisible() {
    await expect(this.mobileNumberBlankErrorMessage).toBeVisible();
  }

  async assertInvalidDOBErrorIsVisible() {
    await expect(this.dateOfBirthErrorMessage).toBeVisible();
  }

  async assertErrorIsVisible(errorMessage) {
    await expect(this.page.getByText(errorMessage)).toBeVisible();
  }

  async assertSubmitBtnIsEnabled() {
    await expect(this.submitBtn).toBeEnabled();
  }

  async assertSubmitBtnIsDisabled() {
    await expect(this.submitBtn).toBeDisabled();
  }

  async fillForm(
    firstName,
    lastName,
    countryCode,
    phoneNumber,
    day,
    month,
    year
  ) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.countryCodeOption.selectOption(countryCode);
    await this.phoneNumberField.fill(phoneNumber);
    await this.dobDayField.fill(day);
    await this.dobMonthField.fill(month);
    await this.dobYearField.fill(year);
  }

  async submitForm() {
    await this.submitBtn.click();
  }

  async assertIncorrectNumberForCountryErrorVisible() {
    return this.incorrectNumberForCountry.isVisible();
  }

  async clearCookies() {
    await this.page.context().clearCookies();
  }

  async close() {
    await this.page.close();
  }
}
