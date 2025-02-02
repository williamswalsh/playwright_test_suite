# Weel Playwright Test Suite

### Execution steps

```shell
# Install node
brew install node

# Check node installation was successful
node -v

# Execute all playwright tests in "tests" sub-directory
npx playwright test

# Execute the tests in a specific file - tests/example.spec.js
npx playwright test example

# Starts the interactive UI mode
npx playwright test --ui

# Runs the tests only on the chromium browser
npx playwright test --project=chromium


# Runs the tests in debug mode - opens playwright inspector window
npx playwright test --debug --project=chromium


./playwright.config.js - Playwright Test configuration
```

### Extra manual test cases

**This is the manual testing that I did:**

- Checking the behaviour of the form & errors in each browser chrome, safari separately
- Test application in an incognito browser - removes session data & cookies

**positive testing**

- checking that valid input is accepted as expected.

**negative testing**  
checking that invalid input is rejected and an error message stating the reason is displayed to the user.  
Ensuring that buttons are still disabled while the input in the form is invalid somehow - terms & conditions checkbox is disabled  
Checking that the phone input can accept numbers with the country code prefix inside the form - does the backend strip this?

**Boundary testing:**

- checking the min max length of the different fields - lastname field form field accepts any length of text - server rejects the text.
- At what max length do the inputs reject or does the server reject the input.
- At what min length do the inputs reject or does the server reject the input.

**Accessibility testing:**

- Checking if the colours of the text & background are accessible.  
  Using the Lighthouse chrome dev tools feature to check the page for accessibility/performance issues.
- The weel logo above the “try weel free today” text is missing an alt attribute. Which is essential for screen readers.
- The xero logo beside the “sign up with xero” text is missing an alt attribute. Which is essential for screen readers.

**Mobile testing:**

- Browsing to the website on my personal device (iOS)

**Usability testing:**

- Check where I could click an element - if I could click where I expect the element to be clickable or not.
- Check if I can use a password manager program like LastPass or icloud keychain with the website.
- Checking if I can tab through the form fields to fill the form without any mouse.

**Defect:**  
The contrast ratio needs to be increased for these elements on the personal-info page:
![alt text](image-1.png)

### If I had more time I would:

**Security testing**

- I would try to submit sql injection strings into the forms to see if the front end or server is escaping the input before placing the values in an sql query.
- Password testing with common passwords which are insecure like Password1!

**API testing**

- bypass the front end and pass json payloads directly to the API to see if I can force an error or understand if the app is vulnerable to different attack, like a DOS attack or sql injection, etc.

**Browser testing:**

- Test with brave and opera and edge

**OS testing:**

- Browsing to the website on my mac & windows devices - no browser-os specific issue.

**Android testing:**

- Test using an android device.
  (Android had a market share of about 72.04%, while Apple's iOS had a market share of about 27.49%)

**Extra automation test:**

- Using Playwright to browse to the site using a viewport matching the latest IPhone & Android phones & checking the behaviour.

**Fuzz testing**

- use a fuzz testing tool to fuzz test the forms.

**Performance test**

- Use playwright/Gatling to do performance testing

### Defect:

On iOS 18.2.1 Chrome 132.0.6834.100:  
When entering a lastname with numbers and letters the form submits ok but then no error is displayed on the screen.
![alt text](image.png)

````

### Sitemap

```shell
# Sign Up page:
https://app-moccona.letsweel.com/app/business-signup

# Sign up page 2:
https://app-moccona.letsweel.com/app/personal-info

# ABN input form:
https://app-moccona.letsweel.com/app/business-info

# Verify business page:
https://app-moccona.letsweel.com/app/verify-business

# Login Page:
https://app-moccona.letsweel.com/app/login
````

### Information

- The app did not reject this email with the expected response code: email@111.222.333.44444  
  Response code: 504 Gateway Timeout  
  The domain part of the email address does not comply with IETF standards.
  ![alt text](tests/screenshots/504_gateway_timeout.png)
- When my internet modem shutdown, my connection to the internet stopped, this is the output logged by playwright.
  ```
  Error: page.goto: net::ERR_INTERNET_DISCONNECTED at
  https://app-moccona.letsweel.com/app/business-signup
  ```
- When submitting an extra long lastname 10000+ characters UI became unresponsive. Front end should not allow lastname to be this long. Server checks lastname and rejects it. Video of behaviour:
  [Unresponsive UI with long lastname](extra_long_lastname_slows_down_ui_nearly_unresponsive_no_response.mov)

### Improvements

- Add description to invalid email addressed giving the reason why its invalid - use sendgrid to check this
- Use Faker javascript library to generate fake data
- Create list of valid or invalid domains for a "work email"
- change the structure of the repo so tests folder doesn't contain screenshots & utils folders.

App uses cognito to authenticate and authorize users.

https://app-moccona.letsweel.com/app/business-compliance#landingPage
![alt text](tests/screenshots/outside_scope_of_testing/business_compliance_landing_page.png)

https://app-moccona.letsweel.com/app/business-compliance#applicantDetails
![alt text](tests/screenshots/outside_scope_of_testing/business_compliance_applicant_details.png)

https://app-moccona.letsweel.com/app/business-compliance#privateCompany_businessDetails
![alt text](tests/screenshots/outside_scope_of_testing/business_compliance_business_details.png)

Connection error??
![alt text](tests/screenshots/outside_scope_of_testing/business_compliance_business_details_connection_error.png)

## REST requests

```javascript
Payload submitted after personal-info page is submitted:
{"email":"william.stephen.walsh33@work.com","first*name":"William","last_name":"Walsh","phone_number":"+61423443204","date_of_birth":"1990-11-11"}
fetch("https://develop.api.divipay.com/api/me/", {
"headers": {
"accept": "application/json, text/plain, */\_",
"accept-language": "en-GB,en;q=0.9,de-DE;q=0.8,de;q=0.7,en-US;q=0.6",
"authorization": "Bearer eyJraWQiOiJmajdZMFZEdUdneWlaSDY1bENnQ3k5ZllNWVNsekVITk9iaDNtSnkyMGlFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4ZjMzZDgwYS0zNzYwLTQxYTktODk2NC0zYjVlZTgzYjE2ZDciLCJkZXZpY2Vfa2V5IjoiYXAtc291dGhlYXN0LTJfOGY2ZjMyMGMtMzdjMS00YTllLWJhZjktMmRiMTA2NzY0MWQ1IiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0yLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0yXzJxQjBTaWRNQyIsImNsaWVudF9pZCI6IjQzcW85NjV0ajF1N21vYXU1ajdvOTgzOWRpIiwib3JpZ2luX2p0aSI6ImNmMjIwNGVkLTkwNjMtNDc1My04ZDkzLTk3MWZiYjI5MDc0ZiIsImV2ZW50X2lkIjoiZjE5ZjI0OGYtZDU4Mi00ODk0LWJiNjEtN2Q0NzNjNDc0MzQzIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTczODAxNTc3NiwiZXhwIjoxNzM4MDE3NTc2LCJpYXQiOjE3MzgwMTU3NzYsImp0aSI6ImI5ODRhNDdhLWY3ZDAtNDUzNS05NzhhLTU4YjIzYmNlN2ZhZiIsInVzZXJuYW1lIjoiOGYzM2Q4MGEtMzc2MC00MWE5LTg5NjQtM2I1ZWU4M2IxNmQ3In0.Jo2B-\_KHySw-dLOp82SPYBXYgn9LcIrtC0Z9TvPb2pwIN8jnVu-CxCapQA7728kUnzEFGms3qvWmdZyw4SH2-wGgoVNO-e_43SGKPdwHAZ5b851PFcolTFHgbnQyPjB05P0LdVoWxqk0daXfponYbVK4r0Oduj9a682_yU_8536W2bpe4Fni3UMR9RQlkUKzQ1UnqVBdf3GzXUyY0fP0jS8leX9CPFKOA1HuRbN6b802WyWr8aOsg3yOZsq3BFIlYDPdfrF5uqQ1nOsqMnKF9HXbkkuBSK6zQ8zMgsHIjVkoP9bxKyIdJCFe6VCKyj-X1ocVa60aTfUhwVfTodh8zQ",
"cache-control": "no-cache",
"content-type": "application/json;charset=UTF-8",
"pragma": "no-cache",
"priority": "u=1, i",
"sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
"sec-ch-ua-mobile": "?0",
"sec-ch-ua-platform": "\"macOS\"",
"sec-fetch-dest": "empty",
"sec-fetch-mode": "cors",
"sec-fetch-site": "cross-site",
"Referer": "https://app-moccona.letsweel.com/",
"Referrer-Policy": "strict-origin-when-cross-origin"
},
"body": "{\"email\":\"william.stephen.walsh33@work.com\",\"first_name\":\"William\",\"last_name\":\"Walsh\",\"phone_number\":\"+61423443204\",\"date_of_birth\":\"1990-11-11\"}",
"method": "PATCH"
});

curl 'https://develop.api.divipay.com/api/me/' \
 -X 'OPTIONS' \
 -H 'accept: _/_' \
 -H 'accept-language: en-GB,en;q=0.9,de-DE;q=0.8,de;q=0.7,en-US;q=0.6' \
 -H 'access-control-request-headers: authorization,content-type' \
 -H 'access-control-request-method: PATCH' \
 -H 'cache-control: no-cache' \
 -H 'origin: https://app-moccona.letsweel.com' \
 -H 'pragma: no-cache' \
 -H 'priority: u=1, i' \
 -H 'referer: https://app-moccona.letsweel.com/' \
 -H 'sec-fetch-dest: empty' \
 -H 'sec-fetch-mode: cors' \
 -H 'sec-fetch-site: cross-site' \
 -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

curl 'https://develop.api.divipay.com/api/me/' \
 -X 'PATCH' \
 -H 'accept: application/json, text/plain, _/_' \
 -H 'accept-language: en-GB,en;q=0.9,de-DE;q=0.8,de;q=0.7,en-US;q=0.6' \
 -H 'authorization: Bearer eyJraWQiOiJmajdZMFZEdUdneWlaSDY1bENnQ3k5ZllNWVNsekVITk9iaDNtSnkyMGlFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4ZjMzZDgwYS0zNzYwLTQxYTktODk2NC0zYjVlZTgzYjE2ZDciLCJkZXZpY2Vfa2V5IjoiYXAtc291dGhlYXN0LTJfOGY2ZjMyMGMtMzdjMS00YTllLWJhZjktMmRiMTA2NzY0MWQ1IiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0yLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0yXzJxQjBTaWRNQyIsImNsaWVudF9pZCI6IjQzcW85NjV0ajF1N21vYXU1ajdvOTgzOWRpIiwib3JpZ2luX2p0aSI6ImNmMjIwNGVkLTkwNjMtNDc1My04ZDkzLTk3MWZiYjI5MDc0ZiIsImV2ZW50X2lkIjoiZjE5ZjI0OGYtZDU4Mi00ODk0LWJiNjEtN2Q0NzNjNDc0MzQzIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTczODAxNTc3NiwiZXhwIjoxNzM4MDE3NTc2LCJpYXQiOjE3MzgwMTU3NzYsImp0aSI6ImI5ODRhNDdhLWY3ZDAtNDUzNS05NzhhLTU4YjIzYmNlN2ZhZiIsInVzZXJuYW1lIjoiOGYzM2Q4MGEtMzc2MC00MWE5LTg5NjQtM2I1ZWU4M2IxNmQ3In0.Jo2B-\_KHySw-dLOp82SPYBXYgn9LcIrtC0Z9TvPb2pwIN8jnVu-CxCapQA7728kUnzEFGms3qvWmdZyw4SH2-wGgoVNO-e_43SGKPdwHAZ5b851PFcolTFHgbnQyPjB05P0LdVoWxqk0daXfponYbVK4r0Oduj9a682_yU_8536W2bpe4Fni3UMR9RQlkUKzQ1UnqVBdf3GzXUyY0fP0jS8leX9CPFKOA1HuRbN6b802WyWr8aOsg3yOZsq3BFIlYDPdfrF5uqQ1nOsqMnKF9HXbkkuBSK6zQ8zMgsHIjVkoP9bxKyIdJCFe6VCKyj-X1ocVa60aTfUhwVfTodh8zQ' \
 -H 'cache-control: no-cache' \
 -H 'content-type: application/json;charset=UTF-8' \
 -H 'dnt: 1' \
 -H 'origin: https://app-moccona.letsweel.com' \
 -H 'pragma: no-cache' \
 -H 'priority: u=1, i' \
 -H 'referer: https://app-moccona.letsweel.com/' \
 -H 'sec-ch-ua: "Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"' \
 -H 'sec-ch-ua-mobile: ?0' \
 -H 'sec-ch-ua-platform: "macOS"' \
 -H 'sec-fetch-dest: empty' \
 -H 'sec-fetch-mode: cors' \
 -H 'sec-fetch-site: cross-site' \
 -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' \
 --data-raw '{"email":"william.stephen.walsh33@work.com","first_name":"William","last_name":"Walsh","phone_number":"+61423443204","date_of_birth":"1990-11-11"}'
{"status": "STEP_UP_REQUIRED"}

curl 'https://develop.api.divipay.com/authorisation/initiate-step-up/' \
 -X 'OPTIONS' \
 -H 'accept: _/_' \
 -H 'accept-language: en-GB,en;q=0.9,de-DE;q=0.8,de;q=0.7,en-US;q=0.6' \
 -H 'access-control-request-headers: authorization,content-type' \
 -H 'access-control-request-method: POST' \
 -H 'cache-control: no-cache' \
 -H 'origin: https://app-moccona.letsweel.com' \
 -H 'pragma: no-cache' \
 -H 'priority: u=1, i' \
 -H 'referer: https://app-moccona.letsweel.com/' \
 -H 'sec-fetch-dest: empty' \
 -H 'sec-fetch-mode: cors' \
 -H 'sec-fetch-site: cross-site' \
 -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
```
