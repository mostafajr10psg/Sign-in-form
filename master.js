let fName = document.querySelector(`input[name="f-name"]`);
let lName = document.querySelector(`input[name="l-name"]`);
let mail = document.querySelector(`input[name="mail"]`);
let mailMsg = document.querySelector(`form div .mail-msg`);
let password = document.querySelector(`input[name="password"]`);
let passwordMsg = document.querySelector(`form div .password-msg`);
let allInputFields = document.querySelectorAll(`form div input`);

let mailExist = document.querySelector(`.mail-exist`);
let mailAdded = document.querySelector(`.success-email-added`);
let subscribeMsg = document.querySelector(
  `.success-email-added .subscribe-msg`
);
let mailName = document.querySelector(
  `.success-email-added .subscribe-msg span`
);
let closeIcon = document.querySelector(".success-email-added .close-icon");
let overlay = document.querySelector(`.overlay`);

function showInputErrors(input) {
  input.classList.add("hidden-placeholder");
  input.classList.add("border-error");
  for (let child of input.parentElement.children) {
    child.classList.contains("error") ? child.classList.remove("hidden") : "";
  }
}

function hiddenInputErrors(input) {
  input.classList.remove("border-error");
  for (let child of input.parentElement.children) {
    child.classList.contains("error") ? child.classList.add("hidden") : "";
  }
}

function removeinlineProp(ele, prop) {
  ele.style.removeProperty(prop);
}

let allMails = [];

localStorage.getItem("mails")
  ? (allMails = JSON.parse(localStorage.mails))
  : (localStorage.mails = JSON.stringify(allMails));

document.forms[0].onsubmit = (e) => {
  e.preventDefault();

  let fNameValid = false,
    lNameValid = false,
    mailValid = false,
    passwordValid = false;

  for (let input of allInputFields) {
    input.value === "" ? showInputErrors(input) : "";
    input.onblur = () => {
      input.value !== "" ? hiddenInputErrors(input) : "";
    };
  }

  // fname & lname Validation
  fName.value !== "" ? (fNameValid = true) : "";
  lName.value !== "" ? (lNameValid = true) : "";

  // Mail Validation
  if (/\w+@\w+\.\w+/.test(mail.value)) {
    mailValid = true;
  } else if (mail.value !== "" && !/\w+@\w+\.\w+/.test(mail.value)) {
    showInputErrors(mail);
    mailMsg.textContent = "Looks like this is not an email";
  }

  // Password Validation
  if (password.value.length >= 6) {
    passwordValid = true;
  } else if (password.value !== "" && password.value.length < 6) {
    passwordMsg.classList.remove("hidden");
    passwordMsg.textContent = "Create a password at least 6 characters long.";
    passwordMsg.style.textAlign = "start";
  }

  if (
    fNameValid === true &&
    lNameValid === true &&
    mailValid === true &&
    passwordValid === true
  ) {
    if (allMails.includes(mail.value)) {
      mailExist.textContent = `${mail.value} is already exist`;
      mailExist.style.bottom = "155px";
      mailExist.style.opacity = "1";
      setTimeout(() => {
        removeinlineProp(mailExist, "bottom");
        removeinlineProp(mailExist, "opacity");
        mail.value = "";
        mail.classList.remove("hidden-placeholder");
      }, 4000);
    } else {
      allMails.push(mail.value);
      localStorage.mails = JSON.stringify(allMails);
      mailAdded.classList.remove("hidden");
      mailName.textContent = mail.value;
      mailName.style.fontWeight = "bold";
      mailName.style.wordBreak = "break-word";
      overlay.classList.remove("hidden");

      closeIcon.addEventListener("click", () => {
        mailAdded.classList.add("hidden");
        overlay.classList.add("hidden");
        for (let input of allInputFields) {
          input.value = "";
          input.classList.remove("hidden-placeholder");
        }
      });
    }
  }
};

fName.value = "Mostafa";
lName.value = "Samir";
password.value = "Mostafajr10";
