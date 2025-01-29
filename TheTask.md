# Requirements

GIVEN the user is on the login page
WHEN the user enters an email address
THEN it should be an email address that matches the email address regex pattern

GIVEN the user is on the login page
WHEN the user enters an email address
THEN it should be a work email address -> the domain must not match??gmail/outlook/ or other common email addresses.
// Assert that the email error message has appeared
"Please try again with your work email address"

GIVEN the user is on the login page
WHEN the user enters a password
THEN it should be at least 8 characters
AND it should contain a number
AND it should contain a special character
AND it should contain an upper case character
AND it should contain a lower case character

GIVEN the user is on the login page
WHEN the user enters a password
THEN it should be a valid password

The user should be able to enter a work email and
valid password before pressing “Sign up with email”
and navigating to the personal-info page.

● Each field should show an error message if they are
unpopulated
● The email field should only accept valid work emails.
● You should not be able to sign up a user that you
have already signed up.
● If either the password or email don’t meet the
requirements, error messages should show.
● Once you submit the personal-info page (with valid
data) you may be navigated to a 2FA page. Don’t
automate that. Finish the test after seeing this page.

**Please include extra manual test cases that you would
perform as part of a testing feature like this.
We’re looking for:  
● Structured tests  
● Attention to detail  
● Be able to share the code/access with us to evaluate your work.**
