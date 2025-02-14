document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const submitButton = document.querySelector(".sign-in-btn");

  // Validation patterns
  const namePattern = /^[a-zA-Z\s]{2,50}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // Check for existing data in localStorage and pre-fill the form
  function loadFromLocalStorage() {
    const savedData = JSON.parse(localStorage.getItem("loginFormData"));
    if (savedData) {
      nameInput.value = savedData.name || "";
      emailInput.value = savedData.email || "";
      // For security reasons, we don't pre-fill password fields
    }
  }

  // Load data from localStorage when the page loads
  loadFromLocalStorage();

  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Validate name
  function validateName() {
    const name = nameInput.value.trim();
    let isValid = true;

    if (name === "") {
      setError(nameInput, nameError, "Name is required");
      isValid = false;
    } else if (!namePattern.test(name)) {
      setError(
        nameInput,
        nameError,
        "Please enter a valid name (letters and spaces only)"
      );
      isValid = false;
    } else if (name.length < 2) {
      setError(nameInput, nameError, "Name must be at least 2 characters long");
      isValid = false;
    } else {
      setSuccess(nameInput, nameError);
    }

    return isValid;
  }

  // Validate email
  function validateEmail() {
    const email = emailInput.value.trim();
    let isValid = true;

    if (email === "") {
      setError(emailInput, emailError, "Email is required");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      setError(emailInput, emailError, "Please enter a valid email address");
      isValid = false;
    } else {
      setSuccess(emailInput, emailError);
    }

    return isValid;
  }

  // Validate password
  function validatePassword() {
    const password = passwordInput.value.trim();
    let isValid = true;

    if (password === "") {
      setError(passwordInput, passwordError, "Password is required");
      isValid = false;
    } else if (!passwordPattern.test(password)) {
      setError(
        passwordInput,
        passwordError,
        "Password must be at least 8 characters long and contain at least one letter and one number"
      );
      isValid = false;
    } else {
      setSuccess(passwordInput, passwordError);
    }

    // Validate confirm password whenever password changes
    if (confirmPasswordInput.value.trim() !== "") {
      validateConfirmPassword();
    }

    return isValid;
  }

  // Validate confirm password
  function validateConfirmPassword() {
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    let isValid = true;

    if (confirmPassword === "") {
      setError(
        confirmPasswordInput,
        confirmPasswordError,
        "Please confirm your password"
      );
      isValid = false;
    } else if (confirmPassword !== password) {
      setError(
        confirmPasswordInput,
        confirmPasswordError,
        "Passwords do not match"
      );
      isValid = false;
    } else {
      setSuccess(confirmPasswordInput, confirmPasswordError);
    }

    return isValid;
  }

  // Set error state
  function setError(input, errorElement, message) {
    input.classList.remove("success");
    input.classList.add("error");
    errorElement.textContent = message;
    updateSubmitButton();
  }

  // Set success state
  function setSuccess(input, errorElement) {
    input.classList.remove("error");
    input.classList.add("success");
    errorElement.textContent = "";
    updateSubmitButton();
  }

  // Update submit button state
  function updateSubmitButton() {
    const isValid =
      !nameInput.classList.contains("error") &&
      !emailInput.classList.contains("error") &&
      !passwordInput.classList.contains("error") &&
      !confirmPasswordInput.classList.contains("error") &&
      nameInput.value.trim() !== "" &&
      emailInput.value.trim() !== "" &&
      passwordInput.value.trim() !== "" &&
      confirmPasswordInput.value.trim() !== "";

    submitButton.disabled = !isValid;
  }

  // Debounced validation functions
  const debouncedNameValidation = debounce(() => {
    validateName();
  }, 300);

  const debouncedEmailValidation = debounce(() => {
    validateEmail();
  }, 300);

  const debouncedPasswordValidation = debounce(() => {
    validatePassword();
  }, 300);

  const debouncedConfirmPasswordValidation = debounce(() => {
    validateConfirmPassword();
  }, 300);

  // Event listeners
  nameInput.addEventListener("input", debouncedNameValidation);
  emailInput.addEventListener("input", debouncedEmailValidation);
  passwordInput.addEventListener("input", debouncedPasswordValidation);
  confirmPasswordInput.addEventListener(
    "input",
    debouncedConfirmPasswordValidation
  );

  // Save form data to localStorage
  function saveToLocalStorage() {
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      // For security reasons, we don't save passwords in localStorage
    };
    localStorage.setItem("loginFormData", JSON.stringify(formData));
  }

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (
      isNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      // Save form data to localStorage
      saveToLocalStorage();

      // Here you would typically send the form data to your server
      console.log("Form submitted successfully");
      console.log("Name:", nameInput.value);
      console.log("Email:", emailInput.value);
      console.log("Password:", passwordInput.value);

      // Simulate API call
      submitButton.textContent = "Signing in...";
      submitButton.disabled = true;

      setTimeout(() => {
        // Reset form after successful submission
        form.reset();
        nameInput.classList.remove("success");
        emailInput.classList.remove("success");
        passwordInput.classList.remove("success");
        confirmPasswordInput.classList.remove("success");
        submitButton.textContent = "Sign In";
        submitButton.disabled = false;

        // Show success message (you can replace this with your preferred UI feedback)
        alert("Logged in successfully!");
      }, 1500);
    }
  });

  // Prevent form submission on Enter key (handle it through the submit event)
  form.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
});
