const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active");
});

const formTitle = document.getElementById("form-title");
const toggleForm = document.getElementById("toggle-form");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("message");

let isLogin = true; // toggle state

toggleForm.addEventListener("click", () => {
  isLogin = !isLogin;
  if (isLogin) {
    formTitle.textContent = "Login";
    submitBtn.textContent = "Login";
    document.querySelector(".toggle").innerHTML =
      "Don't have an account? <span id='toggle-form'>Signup</span>";
  } else {
    formTitle.textContent = "Signup";
    submitBtn.textContent = "Signup";
    document.querySelector(".toggle").innerHTML =
      "Already have an account? <span id='toggle-form'>Login</span>";
  }
  message.textContent = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document
    .getElementById("toggle-form")
    .addEventListener("click", toggleFormHandler);
});

function toggleFormHandler() {
  toggleForm.click();
}

document
  .getElementById("toggle-form")
  .addEventListener("click", toggleFormHandler);

submitBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    message.textContent = "Please fill all fields!";
    message.classList.remove("success");
    return;
  }

  if (password.length < 6) {
    message.textContent = "Password must be at least 6 characters!";
    message.classList.remove("success");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (isLogin) {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem("loggedInUser", username);
      message.textContent = "Login successful!";
      message.classList.add("success");
      setTimeout(() => {
        alert(`Welcome, ${username}!`);
      }, 500);
    } else {
      message.textContent = "Invalid username or password!";
      message.classList.remove("success");
    }
  } else {
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      if (existingUser.password === password) {
        localStorage.setItem("loggedInUser", username);
        message.textContent = "Already signed up! Logging in...";
        message.classList.add("success");
        setTimeout(() => {
          alert(`Welcome back, ${username}!`);
        }, 500);
      } else {
        message.textContent = "Username already taken!";
        message.classList.remove("success");
      }
    } else {
      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", username);
      message.textContent = "Signup successful! Logging in...";
      message.classList.add("success");
      setTimeout(() => {
        alert(`Welcome, ${username}!`);
      }, 500);
    }
  }
});
