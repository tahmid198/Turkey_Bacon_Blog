/* Posts Page JavaScript */

"use strict";

// Function that allows a new user to register for a profile
function getPosts(username) {
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
  
    return fetch(apiBaseURL + `/api/posts`, options)
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

  
// Function to create HTML elements and populate the posts
function populatePostList(posts) {
    const postList = document.getElementById("postList");

    posts.forEach(post => {
        const postContainer = document.createElement("div");
        postContainer.classList.add("post");

        const text = document.createElement("p");
        text.textContent = post.text;

        const username = document.createElement("p");
        username.textContent = `Posted by: ${post.username}`;

        const createdAt = document.createElement("p");
        createdAt.textContent = `Posted on: ${new Date(post.createdAt).toLocaleString()}`;

        const likesCount = document.createElement("p");
        likesCount.textContent = `Likes: ${post.likes.length}`;

        postContainer.appendChild(text);
        postContainer.appendChild(username);
        postContainer.appendChild(createdAt);
        postContainer.appendChild(likesCount);

        postList.appendChild(postContainer);
    });
}

// Ensure the DOM is fully loaded before making the API call
document.addEventListener("DOMContentLoaded", function () {
    getPosts().then(posts => {
        if (posts && posts.length) {
            populatePostList(posts);
        }
    });
});