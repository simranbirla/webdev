const toggle = document.getElementById("toggle");
const sign = document.getElementById("sign");
const nav = document.getElementsByTagName("nav");
const modal = document.getElementById("modal");
const close = document.getElementById("close");
const body = document.getElementsByTagName("body");
//Event listners
toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

sign.addEventListener("click", () => {
  modal.classList.add("show-modal");
});

close.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

window.addEventListener("click", (e) => {
  e.target == modal ? modal.classList.remove("show-modal") : false;
});
