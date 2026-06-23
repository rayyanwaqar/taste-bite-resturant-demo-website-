const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active");
});

const menuContainer = document.querySelector(".menu-container");

const menuData = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 850,
    category: "Pizza",
    img: "./assets/pizza-03.jpg",
    desc: "Classic cheese pizza with fresh basil and tomato sauce.",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    price: 1100,
    category: "Pizza",
    img: "./assets/pizza-02.jpg",
    desc: "Loaded with pepperoni slices and mozzarella cheese.",
  },
  {
    id: 3,
    name: "Chicken Alfredo Pasta",
    price: 1200,
    category: "Pasta",
    img: "./assets/pasta-01.jpg",
    desc: "Creamy garlic Alfredo sauce with grilled chicken.",
  },
  {
    id: 4,
    name: "Spicy Arrabiata Pasta",
    price: 1000,
    category: "Pasta",
    img: "./assets/pasta-02.jpg",
    desc: "Penne pasta in spicy red Arrabiata sauce.",
  },
  {
    id: 5,
    name: "Cold Coffee",
    price: 350,
    category: "Drinks",
    img: "./assets/drinks-02.jpg",
    desc: "Chilled blended coffee with ice and chocolate syrup.",
  },
  {
    id: 6,
    name: "Fresh Lemonade",
    price: 200,
    category: "Drinks",
    img: "./assets/drinks-01.jpg",
    desc: "Refreshing fresh lemon drink served chilled.",
  },
  {
    id: 7,
    name: "Chocolate Brownie",
    price: 300,
    category: "Desserts",
    img: "./assets/deserts-01.jpg",
    desc: "Soft chocolate brownie topped with warm fudge.",
  },
  {
    id: 8,
    name: "Cheesecake Slice",
    price: 450,
    category: "Desserts",
    img: "./assets/deserts-02.jpg",
    desc: "Creamy baked cheesecake with a crunchy base.",
  },
  {
    id: 9,
    name: "Mangocake Slice",
    price: 650,
    category: "Desserts",
    img: "./assets/deserts-03.jpg",
    desc: "Creamy mango cake slice.",
  },
    {
    id: 10,
    name: "Chocloatecake Slice",
    price: 900,
    category: "Desserts",
    img: "./assets/deserts-04.jpg",
    desc: "Creamy chocloate cake slices.",
  },
      {
    id: 11,
    name: "Fresh Apple Juice",
    price: 350,
    category: "Drinks",
    img: "./assets/drinks-03.jpg",
    desc: "Refreshing fresh juicy drink served chilled.",
  },
      {
    id: 12,
    name: "Sodt Drink Juices",
    price: 450,
    category: "Drinks",
    img: "./assets/drinks-04.jpg",
    desc: "Refreshing fresh cold drink served chilled.",
  },
];

// Render Function
function renderMenuItems(menuArray) {
  menuContainer.innerHTML = "";
  menuArray.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("menu-card");
    card.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="menu-img">
        <div class="menu-info">
          <h3 class="menu-name">${item.name}</h3>
          <p class="menu-category">${item.category}</p>
          <p class="menu-desc">${item.desc}</p>
        </div>
        <div class="menu-bottom">
          <span class="menu-price">Rs ${item.price}</span>
          <button class="add-cart-btn" data-id="${item.id}">Add</button>
        </div>
      `;
    menuContainer.appendChild(card);
  });
}

// Initial render
renderMenuItems(menuData);

// Filter Buttons Logic
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("hello");

    // Active class toggle
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;
    if (category === "all") {
      renderMenuItems(menuData);
    } else {
      const filtered = menuData.filter((item) => item.category === category);
      renderMenuItems(filtered);
    }
  });
});

let cartItems = [];
const cartCountEl = document.querySelector(".cart-count");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-cart-btn")) {
    // Find clicked item
    const itemId = Number(e.target.dataset.id);
    const item = menuData.find((menu) => menu.id === itemId);

    // Push to cart array
    cartItems.push(item);

    // Update cart count
    updateCartCount();
     // LocalStorage me save karo
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
});

const cartIcon = document.querySelector(".cart-icon");
const cartDropdown = document.querySelector(".cart-dropdown");

cartIcon.addEventListener("click", () => {
  cartDropdown.style.display =
    cartDropdown.style.display === "flex" ? "none" : "flex";
  renderCartItems();
});

// Render items in dropdown
function renderCartItems() {
  cartDropdown.innerHTML = "";
  cartItems.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
    <span>${item.name} - Rs ${item.price}</span>
    <button class="remove-btn" data-id="${item.id}" 
            style="background:red; color:white; border:none; padding:2px 8px; border-radius:5px; cursor:pointer;">
      Remove
    </button>
  </div>
`;
    cartDropdown.appendChild(div);
  });

  // after cartItems.forEach loop
if(cartItems.length > 0){
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("cart-total");
  totalDiv.innerHTML = `<strong>Total Amount Bill: Rs ${getCartTotal()}</strong>`;
  cartDropdown.appendChild(totalDiv);
}

}

// Remove item
cartDropdown.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const id = Number(e.target.dataset.id);
    cartItems = cartItems.filter((item) => item.id !== id);
    renderCartItems();
    updateCartCount();
  }
});

// Function to update cart count
function updateCartCount() {
  cartCountEl.textContent = cartItems.length;
}


function getCartTotal() {
  return cartItems.reduce((sum, item) => sum + item.price, 0);
}
