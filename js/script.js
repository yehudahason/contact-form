const form = document.querySelector(".form");
const successMessage = document.querySelector(".success-message");
// inputs
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const message = document.getElementById("message");
const queryRadios = document.querySelectorAll('input[name="queryType"]');
const consent = document.querySelector('input[name="consent"]');
const consentError = document.getElementById("consent-error");

//fieldset errors
const queryError = document.querySelector(".fieldset .error");

// email error span
const emailErr = document.getElementById("email-err");

// helpers
function showError(element) {
  element.parentElement.classList.add("error-active");
}

function hideError(element) {
  element.parentElement.classList.remove("error-active");
}

// simple email validation
function isEmailValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  // First name
  if (firstName.value.trim() === "") {
    showError(firstName);
    isValid = false;
  } else {
    hideError(firstName);
  }

  // Last name
  if (lastName.value.trim() === "") {
    showError(lastName);
    isValid = false;
  } else {
    hideError(lastName);
  }

  // Email
  if (email.value.trim() === "") {
    showError(email);
    isValid = false;
  } else if (!isEmailValid(email.value.trim())) {
    emailErr.textContent = "Please enter a valid email address";
    showError(email);
    isValid = false;
  } else {
    hideError(email);
    emailErr.textContent = "This field is required";
  }

  // Query type (radio)
  const querySelected = [...queryRadios].some((radio) => radio.checked);
  if (!querySelected) {
    queryError.style.visibility = "visible";
    isValid = false;
  } else {
    queryError.style.visibility = "hidden";
  }

  // Message
  if (message.value.trim() === "") {
    showError(message);
    isValid = false;
  } else {
    hideError(message);
  }

  // Consent
  if (!consent.checked) {
    consentError.style.visibility = "visible";
    isValid = false;
  } else {
    consentError.style.visibility = "hidden";
  }

  // Submit if valid
  if (isValid) {
    successMessage.classList.add("show");
    form.reset();
    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 5000);
  }
});
