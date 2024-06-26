/* Landing Page JavaScript */

"use strict";

const registerForm = document.querySelector("#register");

registerForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const registerData = {
        username: registerForm.username.value,
        fullName: registerForm.fullname.value,
        password: registerForm.password.value
    }
    // Print the registerData to the console
    console.log(registerData);

    // Disables the button after the form has been submitted already:
    registerForm.registerButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    register(registerData);
};