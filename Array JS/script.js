const main = document.getElementById("main");
const add_user = document.getElementById("add-user");
const double = document.getElementById("double-money");
const million = document.getElementById("show-million");
const sort = document.getElementById("sort");
const delete_btn = document.getElementById("delete");
const total = document.getElementById("total");

let data = []; //array of the users and money
//Generate random users

async function randomUsers() {
  //fetch is used so it is a async function
  const res = await fetch("https://randomuser.me/api"); //await is similar to promise .then()
  const data = await res.json();
  const user = data.results[0];

  const new_user = {
    name: user.name.first + " " + user.name.last,
    money: Math.floor(Math.random() * 10000000),
  };
  addData(new_user);
}

randomUsers();
randomUsers();
randomUsers();

//add the random user created to array
function addData(obj) {
  data.push(obj);
  updateDOM();
}

//To start with some value
//add users in the main function
function updateDOM(provided = data) {
  //clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
  provided.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatmoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//format in money format
function formatmoney(mon) {
  return "Rs " + mon.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Double the money
function doublemoney() {
  data = data.map((item) => {
    return { ...item, money: item.money * 2 };
  });
  updateDOM();
}

//Sort descending
function sort_arr() {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
}

//Show only millionaries
function showMillion() {
  data = data.filter((item) => item.money > 10000000);
  updateDOM();
}
//Delete a user
function deleteUser() {
  data.pop();
  updateDOM();
}

//Total Wealth
function calculate() {
  let total_cal = data.reduce((acc, item) => acc + item.money, 0);

  const total_sum = document.createElement("h3");
  total_sum.innerHTML = `Total Sum is ${formatmoney(total_cal)}`;
  main.appendChild(total_sum);
}

//Event listeners
//Add users button
add_user.addEventListener("click", randomUsers);

//Double the money
double.addEventListener("click", doublemoney);

//Sort by richest
sort.addEventListener("click", sort_arr);

//Filter millionaires
million.addEventListener("click", showMillion);

//delete button
delete_btn.addEventListener("click", deleteUser);

//Total wealth
total.addEventListener("click", calculate);
