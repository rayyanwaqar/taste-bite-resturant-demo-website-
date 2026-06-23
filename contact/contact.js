const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active");
});

const phone = document.querySelector("#phoneImage");

phone.addEventListener("mouseover", () => {
  phone.classList.add("fade-out");

  setTimeout(() => {
    phone.src = "../assets/phone-02.jpg";
    phone.classList.remove("fade-out");
  }, 300);
});

phone.addEventListener("mouseout", () => {
  phone.classList.add("fade-out");

  setTimeout(() => {
    phone.src = "../assets/phone-01.jpg";
    phone.classList.remove("fade-out");
  }, 300);
});


const contactForm = document.getElementById("contactForm");

// Add error message span inside each input-group
const allGroups = document.querySelectorAll(".input-group");
allGroups.forEach(group => {
  const msg = document.createElement("span");
  msg.classList.add("error-msg");
  msg.style.color = "#ff4d4d";
  msg.style.fontSize = "14px";
  msg.style.display = "none";
  group.appendChild(msg);
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;

  // NAME VALIDATION
  const name = document.getElementById("cname");
  const nameMsg = name.nextElementSibling;
  if (name.value.trim() === "") {
    nameMsg.textContent = "Please enter your name";
    nameMsg.style.display = "block";
    valid = false;
  } else {
    nameMsg.style.display = "none";
  }

  // EMAIL VALIDATION
  const email = document.getElementById("cemail");
  const emailMsg = email.nextElementSibling;
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (email.value.trim() === "") {
    emailMsg.textContent = "Please enter your email";
    emailMsg.style.display = "block";
    valid = false;
  } else if (!email.value.match(emailPattern)) {
    emailMsg.textContent = "Enter a valid email address";
    emailMsg.style.display = "block";
    valid = false;
  } else {
    emailMsg.style.display = "none";
  }

  // MESSAGE VALIDATION
  const message = document.getElementById("cmessage");
  const messageMsg = message.nextElementSibling;

  if (message.value.trim() === "") {
    messageMsg.textContent = "Message cannot be empty";
    messageMsg.style.display = "block";
    valid = false;
  } else if (message.value.trim().length < 5) {
    messageMsg.textContent = "Message should be at least 5 characters";
    messageMsg.style.display = "block";
    valid = false;
  } else {
    messageMsg.style.display = "none";
  }

  // If not valid, stop here
  if (!valid) return;

  // =============================
  //  SAVE DATA TO LOCAL STORAGE
  // =============================
  let savedMessages = JSON.parse(localStorage.getItem("contactMessages")) || [];

  const newMessage = {
    name: name.value.trim(),
    email: email.value.trim(),
    message: message.value.trim(),
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  };

  savedMessages.push(newMessage);

  localStorage.setItem("contactMessages", JSON.stringify(savedMessages));

  // =============================
  // SUCCESS MESSAGE
  // =============================
  let successMsg = document.getElementById("contactSuccessMsg");

  if (!successMsg) {
    successMsg = document.createElement("p");
    successMsg.id = "contactSuccessMsg";
    successMsg.style.color = "#00d26a";
    successMsg.style.fontSize = "16px";
    successMsg.style.marginTop = "10px";
    contactForm.appendChild(successMsg);
  }

  successMsg.textContent = "Your message has been sent successfully!";
  successMsg.style.display = "block";

  // fade out after 3 seconds
  setTimeout(() => {
    successMsg.style.opacity = "0";
    setTimeout(() => {
      successMsg.style.display = "none";
      successMsg.style.opacity = "1";
    }, 400);
  }, 3000);

  // RESET FORM
  contactForm.reset();
});
