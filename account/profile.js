
"use strict";

// Function that allows a new user to register for a profile
function getProfile(username) {
    // POST /api/users/{username}

    const token = getLoginData().token;
    const options = {
      method: "GET",
      headers: {
        // This header specifies the type of content we're sending.
        // This is required for endpoints expecting us to send
        // JSON data.
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    };
  
    return fetch(apiBaseURL + `/api/users/${username}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then((profileData) => {
      // Assuming you want to handle the profile data here
      console.log(profileData);
      // For example, you might redirect or update the UI
      // window.location.assign("../account/profile.html");
      return profileData;
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }
  
// Function to populate the div elements with the user data
function populateProfile(data) {
    document.getElementById('username').textContent = data.username;
    document.getElementById('fullname').textContent = data.fullName;
    document.getElementById('bio').textContent = data.bio;
    document.getElementById('createdAt').textContent = data.createdAt;
}

// Ensure the DOM is fully loaded before populating the elements
document.addEventListener("DOMContentLoaded", function () {
    const username = getLoginData().username;
    getProfile(username).then((userData) => {
        if (userData) {
            populateProfile(userData);
        }
    });
});