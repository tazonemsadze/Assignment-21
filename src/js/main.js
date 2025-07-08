"use strict";

const registrationForm = document.querySelector("#registrationForm");

const userPersonalNum = registrationForm.querySelector("#userPersonalNum");
const userEmail = registrationForm.querySelector("#userEmail");
const userPassword = registrationForm.querySelector("#userPassword");

const dialog = document.querySelector(".dialog__succsess");
const dialogBtn = document.querySelector("#dialogBtn");

const stepIndicators = {
  personalNum: document.querySelector(".step__persona--num"),
  email: document.querySelector(".step__email"),
  password: document.querySelector(".step__password"),
};

function getErrorElements(el) {
  const errorBox = el
    .closest(".form__group")
    .querySelector(".error__container");
  const errorMessage = errorBox.querySelector(".error__message");
  return [errorBox, errorMessage];
}

function showError(el, step, message) {
  const [errorBox, errorMessage] = getErrorElements(el);
  errorBox.classList.add("active");
  errorMessage.textContent = message;
  el.classList.remove("succsessInput");
  el.classList.add("errorInput");
  step.classList.remove("success");
  step.classList.add("error");
}

function showSuccess(el, step) {
  const [errorBox] = getErrorElements(el);
  errorBox.classList.remove("active");
  el.classList.remove("errorInput");
  el.classList.add("succsessInput");
  step.classList.remove("error");
  step.classList.add("success");
}

function resetFormStyles() {
  [userPersonalNum, userEmail, userPassword].forEach((input) => {
    input.classList.remove("succsessInput", "errorInput");
    const [errorBox] = getErrorElements(input);
    if (errorBox) errorBox.classList.remove("active");
  });

  Object.values(stepIndicators).forEach((step) => {
    step.classList.remove("success", "error");
  });
}

function isPersonalNumValid() {
  const value = userPersonalNum.value.replace(/\s+/g, "");

  const isOnlyDigits = /^\d{11}$/.test(value);

  if (!value) {
    showError(
      userPersonalNum,
      stepIndicators.personalNum,
      "Personal number is required"
    );
    return false;
  } else if (!isOnlyDigits) {
    showError(
      userPersonalNum,
      stepIndicators.personalNum,
      "Personal number must be exactly 11 digits must contain numbers only"
    );
    return false;
  } else {
    showSuccess(userPersonalNum, stepIndicators.personalNum);
    return true;
  }
}

function isEmailValid() {
  const value = userEmail.value.trim();

  if (!value) {
    showError(userEmail, stepIndicators.email, "Email is required");
    return false;
  } else if (!/^\S+@\S+\.\S+$/.test(value)) {
    showError(
      userEmail,
      stepIndicators.email,
      "Please enter a valid email address"
    );
    return false;
  } else {
    showSuccess(userEmail, stepIndicators.email);
    return true;
  }
}

function isPasswordValid() {
  const value = userPassword.value.trim();

  if (!value) {
    showError(userPassword, stepIndicators.password, "Password is required");
    return false;
  } else if (value.length < 8) {
    showError(
      userPassword,
      stepIndicators.password,
      "Password should be minimum 8 characters long"
    );
    return false;
  } else {
    showSuccess(userPassword, stepIndicators.password);
    return true;
  }
}

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const validPersonalNum = isPersonalNumValid();
  const validEmail = isEmailValid();
  const validPassword = isPasswordValid();

  if (validPersonalNum && validEmail && validPassword) {
    dialog.showModal();
    registrationForm.reset();
  } else {
    console.log("no success");
  }
});

userPersonalNum.addEventListener("blur", isPersonalNumValid);
userEmail.addEventListener("blur", isEmailValid);
userPassword.addEventListener("blur", isPasswordValid);
dialogBtn.addEventListener("click", () => {
  dialog.close();
  resetFormStyles();
});
