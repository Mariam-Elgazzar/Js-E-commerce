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

// //////////////////////////////////////////

const continueBtn = document.querySelector(".continue-btn");
continueBtn.addEventListener("click", () => {
  continueBtn.style.transform = "scale(0.95)";
  setTimeout(() => {
    continueBtn.style.transform = "scale(1)";
    // Redirect to home page or shopping page
    // window.location.href = '/shop';
  }, 200);
});
