(function() {
  'use strict';

  $('.register').click((event) => {
    const first_name = $('#fname').val().trim();
    const last_name = $('#lname').val().trim();
    const email = $('#email').val().trim();
    const password = $('#password').val();
    const password2 = $('#password2').val();

    // Validation
    if (!first_name) {
      return Materialize.toast('Please enter a first name.', 2000);
    }

    if (!last_name) {
      return Materialize.toast('Please enter a last name.', 2000);
    }

    if (!email) {
      return Materialize.toast('Please enter an email.', 2000);
    }

    if (email.indexOf('@') < 0) {
      return Materialize.toast('Please enter a valid email.', 2000);
    }

    if (!password) {
      return Materialize.toast('Please enter a password.', 2000);
    }

    if (password !== password2) {
      return Materialize.toast('Passwords do not match.', 2000);
    }

    let json = { first_name, last_name, email, password };

    const $xhr = $.ajax({
      url: '/users',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(json)
    });

    $xhr.done(() => {
      if ($xhr.status === 409) {
        return Materialize.toast('User already exists. Please login.');
      }

      if ($xhr.status !== 200) {
        const message = 'User could not be created. Please try again.';
        return Materialize.toast(message);
      }

      window.location.href = '/login.html';
    });

    $xhr.fail(() => {
      Materialize.toast('User could not be created. Please try again.');
    });
  });
})();
