document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    // Security Issue #1: Insecure Direct Object Reference (IDOR)
    // Here, user data is stored in plain JavaScript objects, which could be manipulated by a client-side attack.
    let users = {
      admin: "password123",
      user: "userpass",
    };

    if (users[username] === password) {
      // Security Issue #2: Client-Side Data Exposure
      // Storing session information in localStorage is not secure.
      localStorage.setItem("loggedInUser", username);
      message.textContent = "Logged in as " + username;
    } else {
      message.textContent = "Login failed";
    }

    // Security Issue #3: XSS (Cross-Site Scripting)
    // This allows for script injection if username contains malicious code.
    document.write(`<h2>Welcome, ${username}!</h2>`);
  });

// Security Issue #4: Insecure Logging and Sensitive Data Exposure
console.log("Current User: " + localStorage.getItem("loggedInUser"));
