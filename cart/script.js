document.addEventListener("DOMContentLoaded", () => {
  const mainNavMenuButton = document.getElementById("mainNavMenuButton");
  const mainNavMobileMenu = document.getElementById("mainNavMobileMenu");
  const searchButton = document.getElementById("searchButton");

  function toggleMobileMenu(menu) {
    menu.classList.toggle("active");
    document.body.style.overflow = menu.classList.contains("active")
      ? "hidden"
      : "";
  }

  function closeMobileMenu() {
    mainNavMobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  }

  mainNavMenuButton.addEventListener("click", () =>
    toggleMobileMenu(mainNavMobileMenu)
  );

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".mobile-menu") &&
      !e.target.closest(".mobile-menu-button")
    ) {
      closeMobileMenu();
    }
  });

  // Close button functionality
  document
    .querySelector(".mobile-menu-close")
    .addEventListener("click", closeMobileMenu);

  // Populate mobile menu
  const mainNavItems = document.querySelector(".nav-menu").innerHTML;
  mainNavMobileMenu.querySelector(".mobile-nav-menu").innerHTML = mainNavItems;

  // Populate mobile nav actions
  const navActions = document.querySelectorAll(".nav-action-link");
  const mobileNavActions = mainNavMobileMenu.querySelector(
    ".mobile-nav-actions"
  );
  navActions.forEach((action) => {
    if (action.id !== "loginLink") {
      const clone = action.cloneNode(true);
      mobileNavActions.appendChild(clone);
    }
  });

  // Add login link to mobile menu
  const loginLink = document.createElement("a");
  loginLink.href = "#";
  loginLink.className = "mobile-nav-link";
  loginLink.innerHTML = "Login";
  mainNavMobileMenu.querySelector(".mobile-nav-menu").appendChild(loginLink);

  // Search functionality
  searchButton.addEventListener("click", () => {
    const searchInput = document.querySelector(".search-input");
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      // Add your search logic here
      console.log("Searching for:", searchTerm);
    }
  });

  // Handle search on enter key
  document.querySelector(".search-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchButton.click();
    }
  });

  // Simple click handlers for login, wishlist, and cart
  document.getElementById("loginLink").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Login clicked");
    // Add your login logic here
  });

  document.getElementById("wishlistLink").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Wishlist clicked");
    // Add your wishlist logic here
  });

  document.getElementById("cartLink").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Cart clicked");
    // Add your cart logic here
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const dots = document.querySelectorAll(".dot");

  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      // Remove active class from all dots
      dots.forEach((d) => d.classList.remove("active"));
      // Add active class to clicked dot
      dot.classList.add("active");
    });
  });

  // Add hover animation to shop now button
  const shopNowBtn = document.querySelector(".shop-now");
  shopNowBtn.addEventListener("mouseover", () => {
    shopNowBtn.style.transform = "translateY(-2px)";
  });
  shopNowBtn.addEventListener("mouseout", () => {
    shopNowBtn.style.transform = "translateY(0)";
  });
});
const cartItems = [
  {
    id: 1,
    name: "Ut diam consequat",
    color: "Color Brown",
    size: "Size XL",
    price: 100.0,
    image: "../images/cart1.png",
    quantity: 1,
  },
  {
    id: 2,
    name: "Vel faucibus posuere",
    color: "Color Brown",
    size: "Size XL",
    price: 52.0,
    image: "../images/cart2.png",
    quantity: 1,
  },
  {
    id: 3,
    name: "Ac vitae vestibulum",
    color: "Color Brown",
    size: "Size XL",
    price: 70.0,
    image: "../images/cart3.png",
    quantity: 1,
  },
];

// Render cart items
function renderCartItems() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = cartItems
    .map(
      (item) => `
      <div class="cart-item" data-id="${item.id}">
          <div class="product-info">
              <img src="${item.image}" alt="${item.name}" class="product-image">
              <div>
                  <h4>${item.name}</h4>
                  <small>${item.color}</small>
                  <br>
                  <small>${item.size}</small>
              </div>
          </div>
          <div>£${item.price.toFixed(2)}</div>
          <div class="quantity-controls">
              <button class="quantity-btn minus">-</button>
              <input type="number" class="quantity-input" value="${
                item.quantity
              }" min="1">
              <button class="quantity-btn plus">+</button>
          </div>
          <div>£${(item.price * item.quantity).toFixed(2)}</div>
          <button class="remove-btn">×</button>
      </div>
  `
    )
    .join("");

  updateTotals();
}

// Update cart totals
function updateTotals() {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 106.0; // Example shipping cost
  const total = subtotal + shipping;

  document.getElementById("subtotal").textContent = `£${subtotal.toFixed(2)}`;
  document.getElementById("total").textContent = `£${total.toFixed(2)}`;
}

// Event listeners
document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("minus") ||
    e.target.classList.contains("plus")
  ) {
    const item = e.target.closest(".cart-item");
    const id = parseInt(item.dataset.id);
    const cartItem = cartItems.find((item) => item.id === id);

    if (e.target.classList.contains("minus") && cartItem.quantity > 1) {
      cartItem.quantity--;
    } else if (e.target.classList.contains("plus")) {
      cartItem.quantity++;
    }

    renderCartItems();
  }

  if (e.target.classList.contains("remove-btn")) {
    const item = e.target.closest(".cart-item");
    const id = parseInt(item.dataset.id);
    const index = cartItems.findIndex((item) => item.id === id);
    cartItems.splice(index, 1);
    renderCartItems();
  }
});

document.querySelector(".clear-cart").addEventListener("click", () => {
  cartItems.length = 0;
  renderCartItems();
});

document.querySelector(".update-cart").addEventListener("click", () => {
  const inputs = document.querySelectorAll(".quantity-input");
  inputs.forEach((input) => {
    const item = input.closest(".cart-item");
    const id = parseInt(item.dataset.id);
    const cartItem = cartItems.find((item) => item.id === id);
    cartItem.quantity = parseInt(input.value);
  });
  renderCartItems();
});

// Initial render
renderCartItems();

function order() {
  window.location.href = "../order/index.html";
}
