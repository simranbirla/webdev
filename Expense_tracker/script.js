const text = document.getElementById("text");
const amount = document.getElementById("amount");
const button = document.getElementById("btn");
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const delete_btn = document.getElementsByClassName("delete-btn");

/*const dummyTransaction = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Food", amount: -50 },
  { id: 3, text: "Cash", amount: +300 },
];*/

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//ADdd transactiosn to dom
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  //Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button> <button class="update" onclick="update(${
    transaction.id
  })">|||</button>`;

  list.appendChild(item);
}

//get income and expense
function updateValues() {
  const amounts = transactions.map((item) => item.amount);
  const total = amounts
    .reduce((acc, item) => {
      return acc + item;
    }, 0)
    .toFixed(1);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => {
      return acc + item;
    }, 0)
    .toFixed(1);

  const expense =
    amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => {
        return acc + item;
      }, 0)
      .toFixed(1) * -1;

  balance.innerText = `Rs ${total}`;
  money_plus.innerText = `+Rs ${income}`;
  money_minus.innerText = `-Rs ${expense}`;
}

//To add Transaction
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);

  updateValues();
}

//to add Transactions
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();
    updatelocalStorage();
    text.value = "";
    amount.value = "";
  }
}

//Remove transactions
function removeTransaction(id) {
  transactions = transactions.filter((item) => item.id !== id);
  updatelocalStorage();
  init();
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function updatelocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

init();

//Event listners
form.addEventListener("submit", addTransaction);

//update function

function update(id) {
  const val = transactions.filter((item) => item.id === id);
  text.value = val[0].text;
  amount.value = val[0].amount;
  transactions = transactions.filter((item) => item.id !== id);

  init();
}
