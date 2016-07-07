# User Input Validation

In this assignment, you'll add the necessary code to validate user input on the server using `express-validation` and on the client-side using Materialize and jQuery.

## Server-side

Using what's available from the `express-validation` package, add the code for validation logic that follows these rules:

### When a user makes a `POST` to `/users`

- Email
  - is a string
  - is a valid email address
  - is at least 3 characters long
  - is less than 30 characters long
  - contains no white space before or after
  - is required

- Password
  - is a string
  - only contains a-z, A-Z, and 0-9
  - is at least 3 characters long
  - is less than 30 characters long
  - contains no white space before or after
  - is required

## Bonus: Client-side

- Using Materialize and jQuery, create HTML forms that send user input to your server using `$.ajax()`.
- Use the built-in features of Materialize to inform the client when input is invalid.

[TO DO...]
- Include screenshots or quick video/gif of what the user experience might look like when registering on a form and logging a user in
