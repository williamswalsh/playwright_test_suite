# Things to do

```javascript
// Understand why the option to launch in headless mode is created in the script itself and not via command line
// Doesn't seem like a good idea
const browser = await chromium.launch({ headless: false });
```

// TODO: generate unique email using sequential numbers?
// TODO: Create list of valid domains for a "work email"
// TODO: Understand the object hierarchy

// await page.close();

// TODO: Understand the object hierarchy - chromium->context->page etc..
// Should I be constructing those objects
// how to construct them with cross browser tests?
// Close the browser
// await browser.close();

// test('login successfully', async ({ page }) => {
// await page.fill('#username', 'testuser');
// await page.fill('#password', 'password');
// await page.click('button[type="submit"]');
// expect(page.url()).toBe('/dashboard');
// });

// test.describe('Business Signup with work email', () => {
// const users = [
// { username: 'validUser', password: 'password123', shouldPass: true },
// { username: 'invalidUser', password: 'wrongpass', shouldPass: false },
// ];

// Invalid emails should be rejected
//
// william.work.com
// william@.com
// william@work.
// william@workcom
// list of Invalid Email Addresses

// App did not reject this email:accepted
// email@111.222.333.44444 - Invalid email format: the domain part of the email address does not comply with IETF standards.
// email@example.web -> valid email
// Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://app-moccona.letsweel.com/app/business-signup
// Call log:
// - navigating to "https://app-moccona.letsweel.com/app/business-signup", waiting until "load"
