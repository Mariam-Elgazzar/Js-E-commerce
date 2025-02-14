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
  loginLink.href = "../login/index.html";
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
    window.location.href = "../login/index.html";
  });

  document.getElementById("wishlistLink").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Wishlist clicked");
    // Add your wishlist logic here
  });

  document.getElementById("cartLink").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Cart clicked");
    window.location.href = "../cart/index.html";
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

// Filtering functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const category = button.getAttribute("data-category");

    // Show/hide cards based on category
    cards.forEach((card) => {
      if (
        category === "all" ||
        card.getAttribute("data-category") === category
      ) {
        card.style.display = "block";
        // Add animation
        card.style.animation = "fadeIn 0.5s ease";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Add to cart functionality
const cartIcons = document.querySelectorAll(".icon");
cartIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.style.transform = "scale(1.2)";
    setTimeout(() => {
      icon.style.transform = "scale(1)";
    }, 200);
  });
});

// Add fade-in animation
document.styleSheets[0].insertRule(
  `
@keyframes fadeIn {
  from {
      opacity: 0;
      transform: translateY(20px);
  }
  to {
      opacity: 1;
      transform: translateY(0);
  }
}
`,
  0
);

class Slider {
  constructor() {
    this.slider = document.querySelector(".hero-slider");
    this.slidesContainer = this.slider.querySelector(".slides-container");
    this.slides = Array.from(this.slider.querySelectorAll(".slide"));
    this.dotsContainer = this.slider.querySelector(".slider-dots");

    this.currentSlide = 0;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000;

    this.init();
  }

  init() {
    // Create dots
    this.slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });

    // Add navigation listeners
    this.slider
      .querySelector(".prev")
      .addEventListener("click", () => this.prevSlide());
    this.slider
      .querySelector(".next")
      .addEventListener("click", () => this.nextSlide());

    // Initialize first slide
    this.updateSlides();
    this.startAutoPlay();

    // Add touch support
    this.initTouchSupport();

    // Add keyboard navigation
    this.initKeyboardSupport();
  }

  updateSlides() {
    this.slides.forEach((slide, index) => {
      if (index === this.currentSlide) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    // Update dots
    const dots = this.dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide);
    });

    // Update slides container position
    this.slidesContainer.style.transform = `translateX(-${
      this.currentSlide * 100
    }%)`;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlides();
    this.resetAutoPlay();
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlides();
    this.resetAutoPlay();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlides();
    this.resetAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(
      () => this.nextSlide(),
      this.autoPlayDelay
    );
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }

  initTouchSupport() {
    let touchStartX = 0;
    let touchEndX = 0;

    this.slider.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
        clearInterval(this.autoPlayInterval);
      },
      false
    );

    this.slider.addEventListener(
      "touchmove",
      (e) => {
        touchEndX = e.touches[0].clientX;
      },
      false
    );

    this.slider.addEventListener(
      "touchend",
      () => {
        const difference = touchStartX - touchEndX;
        if (Math.abs(difference) > 50) {
          if (difference > 0) {
            this.nextSlide();
          } else {
            this.prevSlide();
          }
        }
        this.startAutoPlay();
      },
      false
    );
  }

  initKeyboardSupport() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.prevSlide();
      } else if (e.key === "ArrowRight") {
        this.nextSlide();
      }
    });
  }
}

// Initialize slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Slider();
});

const data = localStorage.getItem("loginFormData");
JSON.parse(data).name;
const span = document.getElementById("name");
span.textContent = JSON.parse(data).name;
