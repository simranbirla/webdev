const form = document.getElementById("login");
const user = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const con_password = document.getElementById("password2");

//show error
function showError(input, msg) {
  const elem = input.parentElement;
  elem.className = "error";
  const small = elem.querySelector("small");
  small.innerHTML = msg;
}
//show success
function showSuccess(input) {
  const elem = input.parentElement;
  elem.className = "success";
}

//validate email
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email not verified");
  }
}

//check all fields
function checkFields(inputArr) {
  inputArr.forEach((element) => {
    if (element.value.trim() === "") {
      showError(element, `${getFieldName(element)} is required`);
    }
  });
}

//Get name of feild
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Validate the length of the input
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `Minimum length should be ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `Maximum capacity of ${max} characters exceeded `);
  } else {
    showSuccess(input);
  }
}

//valid passwords
function matchPasswords(input, input2) {
  if (input2.length > 0 && input.value === input2.value) {
    showSuccess(input2);
  } else {
    showError(input2, "Passwords don't match");
  }
}

//event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkFields([user, email, password, con_password]);
  checkLength(user, 3, 15);
  checkLength(password, 6, 30);
  checkEmail(email);
  matchPasswords(password, con_password);
});
