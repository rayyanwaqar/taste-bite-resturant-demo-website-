const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active");
});

let bookTable = document.querySelector("#reservedTable");
bookTable.addEventListener("mouseover", () => {
  bookTable.src = "../assets/table-book.jpg";
});
bookTable.addEventListener("mouseout", () => {
  bookTable.src = "../assets/table-book-01.jpg";
});


const bookingForm = document.getElementById("bookingForm");

// Create message spans dynamically
const formGroups = bookingForm.querySelectorAll(".form-group");
formGroups.forEach((group) => {
  const msg = document.createElement("span");
  msg.classList.add("error-msg");
  msg.style.color = "#ff4d4d";
  msg.style.fontSize = "14px";
  msg.style.display = "none";
  group.appendChild(msg);
});

// Get existing bookings from localStorage or initialize empty array
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent form submission

  let valid = true;

  // Name validation
  const name = document.getElementById("name");
  const nameMsg = name.nextElementSibling;
  if (name.value.trim() === "") {
    nameMsg.textContent = "Please enter your name";
    nameMsg.style.display = "block";
    valid = false;
  } else {
    nameMsg.style.display = "none";
  }

  // Email validation
  const email = document.getElementById("email");
  const emailMsg = email.nextElementSibling;
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email.value.trim() === "") {
    emailMsg.textContent = "Please enter your email";
    emailMsg.style.display = "block";
    valid = false;
  } else if (!email.value.match(emailPattern)) {
    emailMsg.textContent = "Please enter a valid email";
    emailMsg.style.display = "block";
    valid = false;
  } else {
    emailMsg.style.display = "none";
  }

  // Phone validation
  const phone = document.getElementById("phone");
  const phoneMsg = phone.nextElementSibling;
  const phonePattern = /^[0-9]{10,15}$/;
  if (phone.value.trim() === "") {
    phoneMsg.textContent = "Please enter your phone number";
    phoneMsg.style.display = "block";
    valid = false;
  } else if (!phone.value.match(phonePattern)) {
    phoneMsg.textContent = "Enter a valid phone number (10-15 digits)";
    phoneMsg.style.display = "block";
    valid = false;
  } else {
    phoneMsg.style.display = "none";
  }

  // Date validation
  const date = document.getElementById("date");
  const dateMsg = date.nextElementSibling;
  if (date.value === "") {
    dateMsg.textContent = "Please select a date";
    dateMsg.style.display = "block";
    valid = false;
  } else {
    dateMsg.style.display = "none";
  }

  // Time validation
  const time = document.getElementById("time");
  const timeMsg = time.nextElementSibling;
  if (time.value === "") {
    timeMsg.textContent = "Please select a time";
    timeMsg.style.display = "block";
    valid = false;
  } else {
    timeMsg.style.display = "none";
  }

  // Guests validation
  const guests = document.getElementById("guests");
  const guestsMsg = guests.nextElementSibling;
  if (guests.value === "" || Number(guests.value) <= 0) {
    guestsMsg.textContent = "Please enter number of guests";
    guestsMsg.style.display = "block";
    valid = false;
  } else {
    guestsMsg.style.display = "none";
  }

  const successMsg = document.getElementById("successMsg");

  if(valid){
    // **Save to localStorage**
    const bookingData = {
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      date: date.value,
      time: time.value,
      guests: Number(guests.value)
    };
    bookings.push(bookingData);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // show success message
    successMsg.textContent = `Thank you, ${name.value}! Your table has been booked for ${guests.value} guest(s) on ${date.value} at ${time.value}.`;
    successMsg.style.display = "block";

    // fade out after 4 seconds
    setTimeout(() => {
      successMsg.style.animation = "fadeOut 0.4s ease forwards";
      setTimeout(() => {
        successMsg.style.display = "none";
        successMsg.style.animation = "fadeIn 0.4s ease forwards"; // reset animation
      }, 400);
    }, 4000);

    bookingForm.reset(); // reset form
  }
});
